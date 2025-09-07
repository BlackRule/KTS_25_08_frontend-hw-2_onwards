import React from 'react';
import styles from './Card.module.scss';
import Text from "../Text";
import classNames from "classnames";

export type CardProps = {
    /** Дополнительный classname */
    className?: string,/*+*/
    /** Клик на карточку */
    onClick?: React.MouseEventHandler;/*+*/
    /** URL изображения */
    image: string;/*+*/
    /** Слот над заголовком */
    captionSlot?: React.ReactNode;/*+*/
    /** Заголовок карточки */
    title: React.ReactNode;/*+*/
    /** Описание карточки */
    subtitle: React.ReactNode;/*+*/
    /** Содержимое карточки (футер/боковая часть), может быть пустым */
    contentSlot?: React.ReactNode;/*+*/
    /** Слот для действия */
    actionSlot?: React.ReactNode;/*+*/
};

const Card: React.FC<CardProps> = (props) => <div className={classNames(props.className,styles.Card)} onClick={props.onClick}>
    <img src={props.image} alt=""/>
    <div className={styles.CardText}>
        <div className={styles.caption}>{props.captionSlot}</div>
        <Text maxLines={2} weight={'medium'} view={'p-20'} tag={'h3'}>{props.title}</Text>
        <Text maxLines={3} color={"secondary"}>{props.subtitle}</Text>
    </div>
    <div className={styles.CardBottom}>
        <div className={styles.contentSlot}>{props.contentSlot}</div>{props.actionSlot}</div>
</div>;

export default Card;
