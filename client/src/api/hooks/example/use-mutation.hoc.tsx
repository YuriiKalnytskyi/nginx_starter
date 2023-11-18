import {AxiosError} from 'axios';
import {useMutation} from 'react-query';

import {toastContainer} from "@/module/common/component";
import {IMessage} from "@/module/common/types";
import {exampleHttpService, exampleAuthHttpService} from "@/api/services/example";
import {IAuthError, IPostAuthHttp, IPostHttp} from "@/types";
import {useExampleQuery} from "@/api/hooks/example/use-queries.hook";

const onError = async (_err: AxiosError<IAuthError>) => {
    const err = _err.response?.data as IAuthError;
    await toastContainer.error({title: err.message ?? _err.message});
};

const onSuccess = async ({message}: IMessage) => {
    await toastContainer.success({title: message});
};

export const postHttp = () => {
    return useMutation<any, AxiosError<IAuthError>, IPostHttp>(
        (data: IPostHttp) => exampleHttpService.post(data),
        {
            onSuccess: onSuccess,
            onError: onError
        }
    );
};

export const postAuthHttp = () => {
    return useMutation<any, AxiosError<IAuthError>, IPostAuthHttp>(
        (data: IPostAuthHttp) => exampleAuthHttpService.post(data),
        {
            onSuccess: onSuccess,
            onError: onError
        }
    );
};

export const useExampleMutation = {
    postHttp,
    postAuthHttp,
};


