import { MessageType } from "@protobuf-ts/runtime";
import { CmdCreateItem, Item, QueryItems } from "types/protos-ts/offerings_pb";

let API_URL = "http://localhost:12096/api/v1";
const SQRET_FIELD_NO = 1601;

type ProtoServiceAnswer<T> = T extends { SQRet?: infer R } ? R : any;
type ProtoServicePayload<T> = Parameters<MessageType<Omit<T, "SQRet">>["create"]>[0];

export async function callProtoService<T extends object>(
  $ty: MessageType<T>,
  query?: ProtoServicePayload<T>
): Promise<ProtoServiceAnswer<T> | null> {
  let parts = $ty.typeName.split('.');
  let serviceName = parts[parts.length - 1];
  let remotePath = "/s/" + serviceName;

  let created = $ty.create({
    ...(query || {})
  });

  let asJson = $ty.toJsonString(created, {
    emitDefaultValues: true,
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

  const rawAnswer = await apiResponse.text();

  let retTyField = $ty.fields.find(f => f.no === SQRET_FIELD_NO);
  if (retTyField === undefined || retTyField.kind !== 'message') {
    return JSON.parse(rawAnswer);
  }

  return retTyField.T().fromJsonString(rawAnswer, {
    ignoreUnknownFields: true
  });
}

(<any>window).callProtoService = callProtoService;
