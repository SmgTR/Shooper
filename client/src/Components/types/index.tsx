import { MouseEventHandler } from 'react';

export interface navLinkActive {
  isActive: boolean;
}

export interface NavLinksProps {
  mobile?: boolean;
  close?: Function;
}

export interface ButtonProps {
  event?: MouseEventHandler;
  text: string;
  btnType?: 'submit' | 'reset' | 'button' | undefined;
  title: string;
  btnClass?: string;
}

export interface ProductInList {
  productId: string;
  name: string;
  description: string;
  createdAt: string;
  price: number;
  image: string;
  brand: string;
  ean: number;
  categories: { name: string; category: string; parent: string };
  quantity: number;
  status: string;
}

export interface ProductType {
  brand: string;
  createdAt: Date;
  description: string;
  id: string;
  image: string[];
  name: string;
  quantity: number;
  status: string;
  availableOptions?: {
    size: string;
    color: string;
  }[];
}
