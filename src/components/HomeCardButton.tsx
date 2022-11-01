import {Card} from "antd-mobile";
import React from "react";

type HomeCardButtonProps = { title: string, imagePath?: string, clickAction?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void }

export function HomeCardButton({title, imagePath, clickAction}: HomeCardButtonProps) {
  return (
    <Card onClick={clickAction} className={'card-button'}>
      {imagePath && <img src={imagePath} alt={title}/>}
      <p>{title}</p>
    </Card>
  );
}
