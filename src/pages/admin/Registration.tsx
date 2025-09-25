import { Space, DatePicker, Tag } from "antd";
import { useRef, useState } from "react";
import ViewDetaiRegister from "@/components/register/view.register";
import { EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import queryString from "query-string";
import { sfLike } from "spring-filter-query-builder";
import DataTable from "@/components/data-table";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchRegistration } from "@/redux/slice/registrationSlide";
import { IRegistration, ITransId } from "@/types/backend";
const { RangePicker } = DatePicker;

const RegistrationPage = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const registration = useAppSelector(state => state.registration.result)
    const paging = useAppSelector(state => state.registration.paging);
    const isFetching = useAppSelector(state => state.registration.isFetching);
    const [transId, setTransId] = useState<ITransId | null>(null);
    const tableRef = useRef<ActionType | null>(null);

    const dispatch = useAppDispatch();


    const columns: ProColumns<IRegistration>[] = [
        {
            title: 'TranId',
            dataIndex: 'transId',
            width: 200,
            align: "center",
        },
        {
            title: 'type',
            dataIndex: 'type',
            width: 200,
            hideInSearch: true,
            align: "center",
        },
        {
            title: 'lastestRegistered',
            dataIndex: 'lastestRegistered',
            width: 200,
            hideInSearch: true,
            align: "center",
        },
        {
            title: 'finalStatus',
            dataIndex: 'finalStatus',
            width: 200,
            hideInSearch: true,
            align: "center",
        },
        {
            title: 'isFinish',
            dataIndex: 'isFinish',
            width: 200,
            hideInSearch: true,
            align: "center",
            render: (_dom, record) => (
                record.isFinish ? (
                    <Tag color="green">True</Tag>
                ) : (
                    <Tag color="red">False</Tag>
                )
            ),
        },
        {
            title: 'createDate',
            dataIndex: 'createDate',
            width: 200,
            align: "center",
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
            render: (text, record, index, action) => {
                return (
                    <>{record.updateDate ? dayjs(record.updateDate).format('DD-MM-YYYY HH:mm:ss') : ""}</>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Detail',
            hideInSearch: true,
            width: 50,
            align: "center",
            render: (_value, entity, _index, _action) => (
                <Space>
                    <EyeOutlined
                        style={{
                            fontSize: 20,
                            color: '#ffa500',
                        }}
                        type=""
                        onClick={() => {
                            setOpenModal(true);
                            setTransId({ transId: entity.transId });
                        }}
                    />
                </Space>
            ),

        },
        {
            title: "CreateDate",
            dataIndex: "createDateRange",
            valueType: "dateRange",
            hideInTable: true,
            search: {
                transform: (value: [string, string]) => {
                    return {
                        startCreateDate: dayjs(value[0]).startOf("day").format("YYYY-MM-DD"),
                        endCreateDate: dayjs(value[1]).endOf("day").format("YYYY-MM-DD"),
                    };
                },
            },
            formItemProps: {
                style: { marginLeft: 10 },
            },
        }

    ];

    return (
        <>
            <div>
                <DataTable<IRegistration>
                    actionRef={tableRef}
                    headerTitle="Registration"
                    rowKey="transId"
                    loading={isFetching}
                    columns={columns}
                    dataSource={registration}
                    request={async (params, sort, filter): Promise<any> => {
                        const clone = { ...params };

                        const payload = {
                            paging: {
                                pageSize: params.pageSize,
                                pageIndex: params.current,
                                total: 0,
                                countTotal: true,
                            },
                            data: {
                                transId: clone.transId || "",
                                startCreateDate: clone.startCreateDate || "",
                                endCreateDate: clone.endCreateDate || "",
                            }
                        };

                        dispatch(fetchRegistration(payload));
                    }}

                    scroll={{ x: true }}
                    pagination={
                        {
                            current: paging?.pageIndex,
                            pageSize: paging?.pageSize,
                            showSizeChanger: true,
                            total: paging?.total,
                            showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                        }
                    }
                    rowSelection={false}
                />
                <ViewDetaiRegister
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    transId={transId}
                />
            </div>
        </>
    );

}
export default RegistrationPage;