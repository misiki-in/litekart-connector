# LiteKart Utility NPM Package

[![npm version](https://litekart.in/logo-litekart.png)](https://litekart.in)

This npm package provides functionality to connect with the LiteKart backend API and can be used as services.

## Installation

You can install the LiteKart utility npm package using npm:

```bash 
npm i @misiki/litekart-connector
```


You can install the LiteKart npm package using pnpm:

```bash 
pnpm i @misiki/litekart-connector
```

## Usages 

you can use this by importing services and then using the functions as needed

```bash 
import {services} from '@misiki/litekart-connector'
```

```bash
const data = await services.CartServices.fetchCart(
    ...
)
```


## Contributions
We are in early phase of this npm package and needs contribution from the community.