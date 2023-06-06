import { MessageType } from "@protobuf-ts/runtime";
import { CmdCreateItem, Item, QueryItems } from "types/protos-ts/offerings_pb";

let API_URL = "http://localhost:12096/api/v1";

const serviceToPathMap = new Map<MessageType<any>, string>();
{
  serviceToPathMap.set(QueryItems, "/q/items");
  serviceToPathMap.set(CmdCreateItem, "/c/create-item");
}

type ProtoServiceAnswer<T> = T extends { SQRet?: infer R } ? R : any;
type ProtoServicePayload<T> = Parameters<MessageType<Omit<T, "SQRet">>["create"]>[0];

export async function callProtoService<T extends object>(
  $ty: MessageType<T>,
  query?: ProtoServicePayload<T>
): Promise<ProtoServiceAnswer<T> | null> {
  let remotePath = serviceToPathMap.get($ty);

  if (remotePath === undefined) {
    return null;
  }

  let created = $ty.create({
    ...(query || {})
  });

  let asJson = $ty.toJsonString(created, {
    emitDefaultValues: true,
    useProtoFieldName: false // FIXME: Temporary hack
  });

  let url = API_URL + remotePath;

  let apiResponse;

  try {
    apiResponse = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: asJson
    });
  } catch (e) {
    console.log("Fetch Error");
    return null;
  }

  if (!apiResponse.ok) {
    console.log("Response Error");
    return null;
  }

  const result = await apiResponse.json();
  return result;
}

(<any>window).callProtoService = callProtoService;
