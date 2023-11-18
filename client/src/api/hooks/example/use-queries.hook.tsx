import {UseQueryResult, useQuery} from 'react-query';

import {exampleHttpService, exampleAuthHttpService} from "@/api/services/example";
import {IGetAuthHttp, IGetHttp} from "@/types";


const getHttp = (id?: Iuuid): UseQueryResult<IGetHttp | undefined> =>
    useQuery(['example_http', id], () => exampleHttpService.get(id), {
        enabled: !!id
    });

const getAuthHttp = (id?: Iuuid): UseQueryResult<IGetAuthHttp | undefined> =>
    useQuery(['example_auth_http', id], () => exampleAuthHttpService.get(id), {
        enabled: !!id
    });

export const useExampleQuery = {
    getHttp,
    getAuthHttp
};
