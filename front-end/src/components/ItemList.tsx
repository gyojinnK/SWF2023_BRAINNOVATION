// eslint-disable-next-line
import React, { useEffect, useState } from "react";

import "./css/ItemList.css";
import ItemInfo from "./ItemInfo";
import clothes from "../datas/clothes.json";
import item1 from "../img/clothes/item1.png";
import item2 from "../img/clothes/item2.png";
import item3 from "../img/clothes/item3.png";
import item4 from "../img/clothes/item4.png";
import item5 from "../img/clothes/item5.png";
import item6 from "../img/clothes/item6.png";
import item7 from "../img/clothes/item7.png";
import item8 from "../img/clothes/item8.png";
import GCsales from "./GCsales";

const ItemList = () => {
    let clotheItems = [item1, item2, item3, item4, item5, item6, item7, item8];

    const [isClick, setIsClick] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);
    const [isOpen, setIsOpen] = useState<{
        checking: boolean;
        index: number;
        item: { name: string; cost: string };
    }>();

    const clickHandler = (index: number) => {
        // state 업데이트
        setIsClick(() => {
            const newIsClick = new Array(clothes.length).fill(0);
            newIsClick[index] = 1;
            return newIsClick;
        });
    };

    const checkClicked = (check: number[]) => {
        // eslint-disable-next-line
        check.map((el, i) => {
            // eslint-disable-next-line
            if (el) {
                setIsOpen({
                    checking: true,
                    index: i,
                    item: { name: clothes[i].name, cost: clothes[i].cost },
                });
                // eslint-disable-next-line
                return;
            }
        });
        return;
    };

    useEffect(() => {
        checkClicked(isClick);
    }, [isClick]);

    return (
        <div className="iListWrap">
            {clothes.map((item, i) => (
                <li className="iLit_li" key={i} onClick={() => clickHandler(i)}>
                    <ItemInfo
                        src={clotheItems[i]}
                        name={item.name}
                        cost={item.cost}
                    />
                </li>
            ))}
            {isOpen?.checking ? (
                <GCsales
                    onIsOpen={setIsOpen}
                    clickedIndex={isOpen.index}
                    name={isOpen.item.name}
                    cost={isOpen.item.cost}
                />
            ) : undefined}
        </div>
    );
};

export default ItemList;
