import { Space, Table } from "antd";
import { useRef, useState } from "react";
import ViewDetaiRegister from "@/components/register/view.register";
import { EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import type { IRegistration } from "../types/backend";
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import queryString from "query-string";
import { sfLike } from "spring-filter-query-builder";
import DataTable from "@/components/data-table";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchRegistration } from "@/redux/slice/registrationSlide";

const RegistrationPage = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const registration = useAppSelector(state => state.registration.result)
    const meta = useAppSelector(state => state.registration.meta);
    const isFetching = useAppSelector(state => state.registration.isFetching);
    const tableRef = useRef<ActionType | null>(null);

    const dispatch = useAppDispatch();


    const columns: ProColumns<IRegistration>[] = [
        {
            title: 'TranId',
            dataIndex: 'transId',
            width: 200,
            sorter: true,
        },
        {
            title: 'type',
            dataIndex: 'type',
            width: 200,
            hideInSearch: true,
        },
        {
            title: 'lastestRegistered',
            dataIndex: 'lastestRegistered',
            width: 200,
            hideInSearch: true,
        },
        {
            title: 'reviewStatus',
            dataIndex: 'reviewStatus',
            width: 200,
            hideInSearch: true,
        },
        {
            title: 'reviewMessage',
            dataIndex: 'reviewMessage',
            width: 200,
            hideInSearch: true,
        },
        {
            title: 'finalStatus',
            dataIndex: 'finalStatus',
            width: 200,
            hideInSearch: true,
        },
        {
            title: 'finalMessage',
            dataIndex: 'finalMessage',
            width: 200,
            hideInSearch: true,
        },
        {
            title: 'isDeleted',
            dataIndex: 'isDeleted',
            width: 200,
            hideInSearch: true,
        },
        {
            title: 'deletedDate',
            dataIndex: 'deletedDate',
            width: 200,
            sorter: true,
            render: (text, record, index, action) => {
                return (
                    <>{record.deletedDate ? dayjs(record.deletedDate).format('DD-MM-YYYY HH:mm:ss') : ""}</>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'isFinish',
            dataIndex: 'isFinish',
            width: 200,
            hideInSearch: true,
        },
        {
            title: 'subType',
            dataIndex: 'subType',
            width: 200,
            hideInSearch: true,
        },
        {
            title: 'createDate',
            dataIndex: 'createDate',
            width: 200,
            sorter: true,
            render: (text, record, index, action) => {
                return (
                    <>{record.createDate ? dayjs(record.createDate).format('DD-MM-YYYY HH:mm:ss') : ""}</>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'updateDate',
            dataIndex: 'updateDate',
            width: 200,
            sorter: true,
            render: (text, record, index, action) => {
                return (
                    <>{record.updateDate ? dayjs(record.updateDate).format('DD-MM-YYYY HH:mm:ss') : ""}</>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Chức năng',
            hideInSearch: true,
            width: 50,
            render: (_value, entity, _index, _action) => (
                <Space>
                    <EditOutlined
                        style={{
                            fontSize: 20,
                            color: '#ffa500',
                        }}
                        type=""
                        onClick={() => {
                            setOpenModal(true);
                        }}
                    />
                </Space>
            ),

        },
    ];

    const buildQuery = (params: any, sort: any, filter: any) => {
        const clone = { ...params };
        const q: any = {
            page: params.current,
            size: params.pageSize,
            filter: ""
        }

        if (clone.name) q.filter = `${sfLike("name", clone.name)}`;

        if (!q.filter) delete q.filter;

        let temp = queryString.stringify(q);

        let sortBy = "";
        if (sort && sort.name) {
            sortBy = sort.name === 'ascend' ? "sort=name,asc" : "sort=name,desc";
        }
        if (sort && sort.createdAt) {
            sortBy = sort.createdAt === 'ascend' ? "sort=createdAt,asc" : "sort=createdAt,desc";
        }
        if (sort && sort.updatedAt) {
            sortBy = sort.updatedAt === 'ascend' ? "sort=updatedAt,asc" : "sort=updatedAt,desc";
        }

        //mặc định sort theo updatedAt
        if (Object.keys(sortBy).length === 0) {
            temp = `${temp}&sort=createdAt,desc`;
        } else {
            temp = `${temp}&${sortBy}`;
        }

        return temp;
    }

    return (
        <>
            <div>
                <DataTable<IRegistration>
                    actionRef={tableRef}
                    headerTitle="Danh sách kích thước"
                    rowKey="id"
                    loading={isFetching}
                    columns={columns}
                    dataSource={registration}
                    request={async (params, sort, filter): Promise<any> => {
                        const query = buildQuery(params, sort, filter);
                        dispatch(fetchRegistration({ query }))
                    }}
                    scroll={{ x: true }}
                    pagination={
                        {
                            current: meta.page,
                            pageSize: meta.pageSize,
                            showSizeChanger: true,
                            total: meta.total,
                            showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                        }
                    }
                    rowSelection={false}
                />
                <ViewDetaiRegister
                    openModal={openModal}
                    setOpenModal={setOpenModal}

                />
            </div>
        </>
    );

}
export default RegistrationPage;