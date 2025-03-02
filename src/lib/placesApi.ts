const placesApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

export const PlacesApi = {
  request(
    method: RequestInit["method"],
      endpoint: string,
      body?: Record<string, any>,
        fields?: Array<string>
    ) {
        const controller = new AbortController()
        return fetch(`https://places.googleapis.com/v1/${endpoint}`, {
        method,
        signal: controller.signal,
        headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": placesApiKey,
        "X-Goog-FieldMask": fields?.join(",") ?? "",
        },
            body: body ? JSON.stringify(body) : null,
        })
        
  },

  get(path: string) {
    return this.request("get", path);
  },

  post(path: string, body?: Record<string, any>, fields?: Array<string>) {
    return this.request("post", path, body, fields);
  },
};

