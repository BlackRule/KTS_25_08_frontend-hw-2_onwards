import React, {useState} from 'react';
import CheckBox from "./components/CheckBox";
import MultiDropdown, {Option} from "./components/MultiDropdown";
import Card from "./components/Card";
import Button from "./components/Button";

const Idx: React.FC<{}> = () => {
  const [checked, setChecked] = useState(false)
  const [checked2, setChecked2] = useState(false)
  const options = [
    { key: 'msk', value: 'Москва' },
    { key: 'spb', value: 'Санкт-Петербург' },
    { key: 'ekb', value: 'Екатеринбург' }
  ];
  const value = [{key: 'msk', value: 'Москва'}];
  const onChange = (value: Option[]) => console.log('Выбрано:', value);
  return <div style={{
    backgroundColor: 'gray',
    color:"white",
    border: '10px solid black',
    display:'flex',
    flexDirection: 'column',
    gap: '10px'
  }}>
    {/*<Card
          onClick={() => console.log('Мандарин куплен!')}
          image='/picture.svg'
          captionSlot='caption-text'
          title={'kts-school-frontend kts-school-frontend kts-school-frontend kts-school-frontend'}
          subtitle={<>kts-school-frontend kts-school-frontend kts-school-frontend kts-school-frontend kts-school-frontend kts-school-frontend kts-school-frontend</>}
          contentSlot={<>99.88</>}
          actionSlot={<Button>В корзину</Button>}
      />*/}
    {/*<CheckBox onChange={(checked: boolean): void => {
      setChecked(checked)
    }} checked={checked} disabled/>
    <CheckBox onChange={(checked: boolean): void => {
      setChecked(checked)
    }} checked={checked2} disabled/>
    <CheckBox onChange={(checked: boolean): void => {
      setChecked2(checked)
    }} checked={checked2}/>*/}
    // Простой фильтр
<MultiDropdown
    options={options}
    value={value}
    onChange={onChange}
    getTitle={() => ''}
/>

// Заблокированный фильтр
<MultiDropdown
    disabled
    options={options}
    value={value}
    onChange={onChange}
    getTitle={(values: Option[]) => values.length === 0 ? 'Выберите город' : `Выбрано: ${values.length}`}
/>

// Фильтр, отображающий количество выбранных вариантов
<MultiDropdown
    options={options}
    value={value}
    onChange={onChange}
    getTitle={(values: Option[]) => `Выбрано: ${values.length}`}
/>
    <Button children={'undefined'} loading/>
  </div>
};
// will actions run?
export default Idx;
