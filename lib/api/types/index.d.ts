type DbRecordId = number;

interface WithDbRecord {
  id: DbRecord;
}

type ServiceSuccess<T> = {
  data: T;
};

type ServiceError = {
  message: string;
  reqUid: string;
};
