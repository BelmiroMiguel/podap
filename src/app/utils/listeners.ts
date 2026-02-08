export interface AppListener<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
  onLoad?: () => void;
  onFinally?: () => void;
  onCancel?: () => void;
  onStatusCade?: (statusCode: any) => void;
}


export interface OnStateListener {
  saveItem: (item: Object, page: any) => void;
}


