# Proxy with Behavior
Proxy with Behavior is a node application that work as a reverse proxy, and enables apply some behaviors to be executed in requests.

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
			"pattern_source":null,
			"pattern_flag":null,
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
			"pattern_source":null,
			"pattern_flag":null,
			"createdAt": "2022-01-07T19:58:29.465Z",
			"updatedAt": "2022-01-07T19:58:29.465Z"
		}
	]
}
```

### `POST` /behaviors

Store behaviors and return the updated list. It's important to say that you can only associate a single behavior to a resource/method. This means, for instance, if you store a `change-response` behavior to the method/resource `GET /posts`, you can't store another behavior to the same method/resource, but if you want it, you can do this to another method of a resource (e.g. `latency` behavior applied to `POST /posts`).
```json
# curl -X POST http://localhost:3001/behaviors -d '{"type": "change-response","resource": "/posts","method": "GET","status": 500, "pattern": {"source": "see (chapter \\d+(\\.\\d)*)","flag": "i"} }'
{
	"behaviors": [
		{
			"id": 2,
			"type": "change-response",
			"resource": "/posts",
			"method": "POST",
			"status": 500,
			"active": true,
			"data": null,
			"pattern_source": "see (chapter \\d+(\\.\\d)*)",
			"pattern_flag": "i",
			"createdAt": "2022-01-11T01:33:37.187Z",
			"updatedAt": "2022-01-11T01:33:37.187Z"
		}
	]
}
```

- **Required fields:** `type`, `resource`, and `method`
- **Not required fields:** `status`, `pattern.source`, `pattern.flag`, `active` and `data`;

> When you try latency behavior, use `data` field and consider this field as timeout in milliseconds value. This means if you use 'data': '5000', the behavior will apply a latency of 5 seconds before execute the request.
> pattern.source and pattern.flag are used to define a regular expression that will verify where apply the behavior.

### `PUT` /behaviors/:id/toggle

Toggle behavior's active state.

```json
# curl -X PUT http://localhost:3001/behaviors/1/toggle
{
	"behaviors": [
		{
			"id": 2,
			"type": "change-response",
			"resource": "/posts",
			"method": "POST",
			"status": 500,
			"active": true,
			"data": null,
			"pattern_source": "see (chapter \\d+(\\.\\d)*)",
			"pattern_flag": "i",
			"createdAt": "2022-01-11T01:33:37.187Z",
			"updatedAt": "2022-01-11T01:33:37.187Z"
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
- [x] It's possible define a regular expression pattern, that will check if a behavior must be applied or not. If none pattern is defined, the behavior will be applied;
- [x] Toggle of active behavior's state;
## What's next

- [ ] On `change-response` use `data` attribute as response when exists;
