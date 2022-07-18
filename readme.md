
# Project Title

A brief description of what this project does and who it's for


## SENSOR API Reference

#### Get all dashboard data

```http
  GET /api/sensor/:type/:gte/:lte/:keyword
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `type` | `string` | **Required**. Example : docs |
| `gte` | `date` | **Required**.|
| `lte` | `date` | **Required**.|
| `keyword` | `string` | **Required**.|


#### Get item filter by APP RISK

```http
  POST /api/sensor/tables/search
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `gte` | `date` | **Required**.|
| `lte` | `date` | **Required**.|
| `keyword` | `string` | **Required**. Example: medium, low |


#### Get item filter by Service

```http
  POST /api/sensor/service/search
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `gte` | `date` | **Required**.|
| `lte` | `date` | **Required**.|
| `keyword` | `string` | **Required**. Example: http, ssl, etc |


#### Get item filter by Direction

```http
  POST /api/sensor/direction/search
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `gte` | `date` | **Required**.|
| `lte` | `date` | **Required**.|
| `keyword` | `string` | **Required**. Example: outgoing, incoming |


#### Get item filter by DST Country

```http
  POST /api/sensor/dst-country/search
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `gte` | `date` | **Required**.|
| `lte` | `date` | **Required**.|
| `keyword` | `string` | **Required**. Example: Netherland, Reserved, Etc |

#### Get item filter by SRC Country

```http
  POST /api/sensor/src-country/search
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `gte` | `date` | **Required**.|
| `lte` | `date` | **Required**.|
| `keyword` | `string` | **Required**. Example: Netherland, Reserved, Etc |

#### Get all item data

```http
  POST /api/sensor/table-view/search
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `gte` | `date` | **Required**.|
| `lte` | `date` | **Required**.|
| `keyword` | `string` | **Required**. Example: Universal Parameter **DEFAULT**:* |
