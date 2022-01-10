# Proxy Behavior
Proxy Behavior is a node application that work as a reverse proxy, and enables apply some behaviors to be executed in requests.
It's intended to help during Chaos Testing, allowing you to apply, for instance, a behavior that triggers 500 status exception.

## How to use the API?
> The proxy API to handle with behaviors, usually uses port 3001.

### How to get it running

To run the proxy using docker, execute the following commands:
```bash
docker build -t proxy-with-behavior .

docker run --rm -d -p 3000:3000 -p 3001:3001 -e "NODE_ENV=production" -e "SERVICE_URL=https://jsonplaceholder.typicode.com" --name proxy-with-behavior-container proxy-with-behavior
```
If you want to apply this proxy, in front of your app, you just need to configure the network (or service) as a proxy. Consider that `SERVICE_URL` is a environment variable used to determine who is the proxied service.

### `GET` /behaviors

List all stored behaviors
```json
# curl http://localhost:3001/behaviors
{
	"behaviors": [
		{
			"id": 1,
			"type": "change-response",
			"resource": "/posts",
			"method": "POST",
			"status": 500,
			"active": true,
			"data": null,
			"createdAt": "2022-01-07T19:58:24.895Z",
			"updatedAt": "2022-01-07T19:58:24.895Z"
		},
		{
			"id": 2,
			"type": "change-response",
			"resource": "/posts",
			"method": "GET",
			"status": 500,
			"active": true,
			"data": null,
			"createdAt": "2022-01-07T19:58:29.465Z",
			"updatedAt": "2022-01-07T19:58:29.465Z"
		}
	]
}
```

### `POST` /behaviors

Store behaviors and return the updated list. It's important to say that you can only associate a single behavior to a resource/method. This means, for instance, if you store a `change-response` behavior to the method/resource `GET /posts`, you can't store another behavior to the same method/resource, but if you want it, you can do this to another method of a resource (e.g. `latency` behavior applied to `POST /posts`).
```json
# curl -X POST http://localhost:3001/behaviors -d '{"type": "change-response","resource": "/posts","method": "GET","status": 500 }'
{
	"behaviors": [
		{
			"id": 2,
			"type": "change-response",
			"resource": "/posts",
			"method": "GET",
			"status": 500,
			"active": true,
			"data": null,
			"createdAt": "2022-01-07T19:58:29.465Z",
			"updatedAt": "2022-01-07T19:58:29.465Z"
		}
	]
}
```

- **Required fields:** `type`, `resource`, `method`, and `status`
- **Not required fields:** `active` and `data`;

> When you try latency behavior, use `data` field and consider this field as timeout in milliseconds value. This means if you use 'data': '5000', the behavior will apply a latency of 5 seconds before execute the request.

### `PUT` /behaviors/:id/toggle

Toggle behavior's active state.

```json
# curl -X PUT http://localhost:3001/behaviors/1/toggle
{
	"behaviors": [
		{
			"id": 1,
			"type": "change-response",
			"resource": "/posts",
			"method": "GET",
			"status": 500,
			"active": false,
			"data": null,
			"createdAt": "2022-01-10T17:40:30.157Z",
			"updatedAt": "2022-01-10T17:40:58.217Z"
		}
	]
}
```

### `DELETE` /behaviors/:id

Deletes a behavior by his ID and returns the updated list.

```json
# curl -X DELETE http://localhost:3001/behaviors/1
{
	"behaviors": []
}
```

## Behavior types
- `change-response`: Change the response (enables you to change status, or the data returned);
- `latency`: Add latency to the request;

## What it does?
- [x] Proxy requests to a service;
- [x] API to enable behavior's manipulation;
- [x] Register of `change-response` behavior, enabling intercept and change status code's response;
- [x] Register of `latency` behavior, enabling add latency in milliseconds;
- [x] Toggle of active behavior's state;
## What's next

- [ ] On `change-response` use `data` attribute as response when exists;
