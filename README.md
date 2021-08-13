# Steam-balance-tracker-server (SBT-server)
This is an application that executes a cronJob with a Rest API support.

API: https://steam-balance-tracker-server.herokuapp.com/

## Before starting the application
ItemName, InventoryItem and Inventory datas should be created and logicly related. (These values should not be changed.)

### What this application does
Everyday at 11.00 UTC server starts and at 11.05 application creates InventoryWithDate by getting each InventoryItem of Inventory named 'ziya'. With each InventoryItem, application gets the ItemName which allows us to get current prices from Steam API. For each ItemName application saves them as ItemPriceWithDate. After all these DB updates, it writes currentBalance inside the InventoryWithDate and save it in DB. Finally, application send a message indicating the balance and current date through Telegram.

#### Data Models 
- ItemName
```ts
{
	market_hash_name: 'Falchion Case'
}
```

- InventoryItem
```ts
{
	amount: 1000
	itemNameId: '1234' // InventoryItem belongsTo ItemName
	inventoryId: '1534' // InventoryItem belongsTo Inventory
}
```

- ItemPriceWithDate
```ts
{
	date: '10.12.2021'
	price: 2.34
	itemNameId: '1234'  // ItemPriceWithDate belongsTo ItemName
}
```


- Inventory
```ts
{
	name: 'ziya',
	inventoryItems: [
		'3457345',
		'3845348'
	] // Inventory hasMany InventoryItem
}
```

- InventoryWithDate
```ts
	date: '12.10.2021'
	balance: 17800
	inventoryId: '4568' // InventoryWithDate belongsTo Inventory
}
```
