import { MessageType } from "@protobuf-ts/runtime";
import { Item, ItemsQuery } from "types/protos-ts/offerings_pb";

const queryToPathMap = new Map<MessageType<any>, string>();
queryToPathMap.set(ItemsQuery, "/items");

let API_URL = "http://localhost:12096/api/v1";

export async function callProtoQuery<T extends object>(
  $ty: MessageType<T>,
  query?: Parameters<(typeof $ty)["create"]>[0]
): Promise<any> {
  let remotePath = queryToPathMap.get($ty);

  if (remotePath === undefined) {
    return;
  }

  let created = $ty.create(query || {});
  let asJson = $ty.toJsonString(created, {
    emitDefaultValues: true,
    useProtoFieldName: true
  });

  let url = API_URL + "/query" + remotePath;
  const apiResponse = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: asJson
  });

  if (apiResponse.status != 200) {
    console.log("Error");
    return null;
  }

  const result = await apiResponse.json();
  return result
}

(<any>window).callProtoQuery = callProtoQuery;

