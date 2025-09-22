import os
import sys
import json
import time
import random
import string
from typing import Optional, Tuple

import requests

BASE_URL = os.environ.get("BASE_URL", "https://front-school-strapi.ktsdev.ru/api")
AUTH_REGISTER = f"{BASE_URL}/auth/local/register"
AUTH_LOGIN = f"{BASE_URL}/auth/local"
PRODUCTS_URL = f"{BASE_URL}/products"
CART_URL = f"{BASE_URL}/cart"
CART_ADD_URL = f"{BASE_URL}/cart/add"
CART_REMOVE_URL = f"{BASE_URL}/cart/remove"


def jprint(title: str, resp: requests.Response):
    print(f"\n=== {title} ===")
    print(f"URL: {resp.request.method} {resp.request.url}")
    if resp.request.body:
        try:
            print("Request body:", json.loads(resp.request.body))
        except Exception:
            print("Request body (raw):", resp.request.body)
    print("Status:", resp.status_code)
    ctype = resp.headers.get("content-type", "")
    try:
        if "application/json" in ctype:
            print(json.dumps(resp.json(), indent=2, ensure_ascii=False))
        else:
            print(resp.text[:1000])
    except Exception as e:
        print("<failed to decode body>", e)


def req(method: str, url: str, jwt: Optional[str] = None, **kwargs) -> requests.Response:
    headers = kwargs.pop("headers", {}) or {}
    if jwt:
        headers["Authorization"] = f"Bearer {jwt}"
    # Ensure JSON requests by default when data is dict
    data = kwargs.pop("json", None)
    if data is not None:
        kwargs["json"] = data
    return requests.request(method, url, headers=headers, **kwargs)


def make_test_credentials() -> Tuple[str, str]:
    email = os.environ.get("TEST_EMAIL")
    password = os.environ.get("TEST_PASSWORD")
    if email and password:
        return email, password
    # Otherwise, generate new credentials each run
    ts = int(time.time())
    rand = ''.join(random.choices(string.ascii_lowercase + string.digits, k=6))
    return f"test_{ts}_{rand}@example.com", "Test12345!"


def signup_or_login(email: str, password: str) -> Tuple[Optional[str], dict]:
    # Try signup first
    r = req("POST", AUTH_REGISTER, json={
        "email": email,
        "password": password,
        "username": email.split("@")[0]
    })
    jprint("POST /auth/local/register", r)
    if r.ok:
        data = r.json()
        return data.get("jwt"), data
    # If signup failed (maybe already exists), try login
    r2 = req("POST", AUTH_LOGIN, json={
        "identifier": email,
        "password": password,
    })
    jprint("POST /auth/local", r2)
    if r2.ok:
        data = r2.json()
        return data.get("jwt"), data
    return None, {}


def get_any_product_raw(jwt: Optional[str]) -> Optional[dict]:
    # Keep it simple: try to fetch a small set
    params = {"pagination[limit]": 1}
    r = req("GET", PRODUCTS_URL, jwt, params=params)
    jprint("GET /products?pagination[limit]=1", r)
    if not r.ok:
        return None
    try:
        body = r.json()
    except Exception:
        return None
    # Different APIs: body may be {data: [...]} or {data: {...}} etc.
    data = body.get("data")
    if isinstance(data, list) and data:
        return data[0]
    elif isinstance(data, dict):
        return data
    # Or maybe products is returned directly
    if isinstance(body, list) and body:
        return body[0]
    return None


def pick_product_id_for_cart(prod: dict) -> Optional[int]:
    # We need numeric product id for cart according to the spec.
    # Try a few common places.
    # 1) top-level numeric id
    pid = prod.get("id")
    if isinstance(pid, int):
        return pid
    # 2) attributes.id (Strapi default is numeric id at top-level; documentId could be elsewhere)
    attrs = prod.get("attributes") if isinstance(prod, dict) else None
    if isinstance(attrs, dict):
        aid = attrs.get("id")
        if isinstance(aid, int):
            return aid
    # 3) Fallback: None; caller will try with other fields like documentId if needed
    return None


def try_cart_flow(jwt: str):
    # 1) GET /cart
    r = req("GET", CART_URL, jwt)
    jprint("GET /cart", r)

    # 2) Get one product
    prod = get_any_product_raw(jwt)
    if not prod:
        print("Could not get a product from /products; aborting add/remove tests.")
        return

    # Inspect product to decide id to use
    numeric_id = pick_product_id_for_cart(prod)
    candidate_ids = []
    if numeric_id is not None:
        candidate_ids.append(numeric_id)
    # Add some other guesses so we can see server response
    for key in ("documentId", "productId", "_id"):
        val = prod.get(key)
        if val is not None:
            candidate_ids.append(val)

    used_id = None
    # 3) Try POST /cart/add with candidates
    for cid in candidate_ids:
        r = req("POST", CART_ADD_URL, jwt, json={"product": cid, "quantity": 1})
        jprint(f"POST /cart/add {{product: {cid}, quantity: 1}}", r)
        if r.ok:
            used_id = cid
            break

    if used_id is None and candidate_ids:
        print("All candidate product ids failed to add. Please advise expected product id for /cart.")
        return

    if used_id is None:
        print("No candidate product id found. Please provide a valid numeric product id for /cart.")
        return

    # 4) GET /cart after add
    r = req("GET", CART_URL, jwt)
    jprint("GET /cart (after add)", r)

    # 5) POST /cart/remove
    r = req("POST", CART_REMOVE_URL, jwt, json={"product": used_id, "quantity": 1})
    jprint(f"POST /cart/remove {{product: {used_id}, quantity: 1}}", r)

    # 6) GET /cart after remove
    r = req("GET", CART_URL, jwt)
    jprint("GET /cart (after remove)", r)


if __name__ == "main" or __name__ == "__main__":
    email, password = make_test_credentials()
    print("Using credentials:", email, password)
    jwt, auth_payload = signup_or_login(email, password)
    if not jwt:
        print("Failed to obtain JWT; aborting.")
        sys.exit(1)
    print("JWT acquired (length):", len(jwt))
    try_cart_flow(jwt)
