import React from "react";

interface ListProps<T> {
  items: T[] | undefined;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export default function ItemsList<T>({ items, renderItem }: ListProps<T>) {
  return (
    <>
      {items !== undefined &&
        items?.map((item: T, index: number) => renderItem(item, index))}
    </>
  );
}
