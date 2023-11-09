// "use client"
// import * as React from 'react';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';
// import { Autocomplete, Box, Checkbox, DialogContentText, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';

// import { mutate } from "swr"
// import { useState, useEffect } from 'react';
// import { toast } from 'react-hot-toast';
// import { format } from "date-fns";
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import { FilterComparator } from '@/app/models/common';
// import apiClient from '@/app/api/ApiClient';

// interface IProps {
//     showModalCreate: boolean;
//     setShowModalCreate: (value: boolean) => void;
//     setOpen: (value: any) => void;
//     : (value: IDepartment | null) => void;
//     getDepartment: () => void;
// }
// interface Supply {
//     id: string,
//     name: string,
//     code: string,
//     unit: string,
//     imageUrls: void,

// }
// interface SupplyId {
//     supplyId: string,
//     quantity: number
// }
// const top100Films = [
//     {
//         "code": "12oqcusefm",
//         "id": "4474999c-25c2-4c94-895a-e11c2c6f60cd",
//         "name": "lljorara8m",
//         "unit": "0cm087xk6o"
//     },
//     {
//         "code": "1ix77iibfb",
//         "id": "0d8fcc26-cb14-42ed-a9b7-e69b969b962d",
//         "name": "s99jsllhpm",
//         "unit": "fq10b9usqs"
//     },
//     {
//         "code": "n5vc84peez",
//         "id": "d4e4e11c-a5f1-4f40-8ed2-780ab0a87345",
//         "name": "2pinirjzry",
//         "unit": "pf95v729bw"
//     },
//     {
//         "code": "2a47j37tru",
//         "id": "65e9fc59-ba25-4de4-a807-fad856ce2f97",
//         "name": "mv3ysfa8kj",
//         "unit": "nty0tisma3"
//     },
//     {
//         "code": "a2misyrc92",
//         "id": "c380bbce-8b14-4e7b-aaa9-d2935e0b1204",
//         "name": "dwkc0r7een",
//         "unit": "746zciv5q8"
//     },
//     {
//         "code": "qym54oqw0o",
//         "id": "f1b66a76-7db9-4bd6-af57-9a7fbf47ee2a",
//         "name": "lswu7btjtu",
//         "unit": "jc7j0xcjrl"
//     },
//     {
//         "code": "m9we71mnoq",
//         "id": "27a76e76-dd4b-4555-8521-646ddd02c66f",
//         "name": "4twxcjdto2",
//         "unit": "ppggbmzaio"
//     },
//     {
//         "code": "1w8o9p5lp7",
//         "id": "fd538049-eb50-4d6d-a200-f86e7774bb8b",
//         "name": "tv6jgvcqkb",
//         "unit": "qf4h37cmde"
//     },
//     {
//         "code": "lklsnh7g3y",
//         "id": "498b66eb-0d99-4a63-8fc0-01b2f366e173",
//         "name": "c1zfqjxuyr",
//         "unit": "0omr5qgk0c"
//     },
//     {
//         "code": "9cxvw7myn7",
//         "id": "9bf6cfe8-2d99-4a79-87cc-8a6c47984e65",
//         "name": "t82rbfwatz",
//         "unit": "nxmo2jmj1p"
//     },
//     {
//         "code": "pt9kld7uja",
//         "id": "63fb45b7-55fd-4026-a836-e0634c213fff",
//         "name": "40ibvcgiz8",
//         "unit": "aln10177gw"
//     },
//     {
//         "code": "oor4tu87hp",
//         "id": "c988dd58-b908-47dd-9b6a-a98dc7751efa",
//         "name": "gr2lj69r9r",
//         "unit": "rvlyj8qgj8"
//     },
//     {
//         "code": "b6ccgl4ct7",
//         "id": "61e7fffe-5c7f-4a92-8055-fa1bbf632cfb",
//         "name": "q41vfrbjga",
//         "unit": "7d1u5j3ou4"
//     },
//     {
//         "code": "lowawv6i3k",
//         "id": "ef3ec342-3d29-4e7e-9854-c0382d3ff7d7",
//         "name": "zvym1w40kw",
//         "unit": "gtrf8t9ykx"
//     },
//     {
//         "code": "7l90az5a67",
//         "id": "e19ba413-741c-4206-87d5-f73f753c7948",
//         "name": "x3b4hycl8p",
//         "unit": "wzdyng7b8m"
//     },
//     {
//         "code": "p4zmkev1xg",
//         "id": "a2ea47e8-5ff4-41ec-8bce-dd2976477df6",
//         "name": "ac2ohea68n",
//         "unit": "u5urcmo04t"
//     },
//     {
//         "code": "r0pdsazfjf",
//         "id": "5e2bb2ab-d74a-4a26-8175-0d63e0c40a87",
//         "name": "s91kxa894u",
//         "unit": "i6i7j3lpjz"
//     },
//     {
//         "code": "tdp4vfjvqn",
//         "id": "7e867925-1e9a-4e77-b208-6202420ae344",
//         "name": "3xf8i8f2x7",
//         "unit": "e0ct48gciv"
//     },
//     {
//         "code": "263psaskql",
//         "id": "f6149f5e-159a-4a6b-85f2-1fe8ae2f8987",
//         "name": "0pjhhlghuf",
//         "unit": "c0p2cmrj9c"
//     },
//     {
//         "code": "31hxm0r0f1",
//         "id": "4c7407b5-87f7-4b1e-b257-24f37cb0260c",
//         "name": "ltypgz2kl9",
//         "unit": "7v1e4wlvnu"
//     },
//     {
//         "code": "s8djwpn73h",
//         "id": "0af8b9e2-02ea-4790-b544-8c1cd77d2acb",
//         "name": "37ff3wqrjo",
//         "unit": "tdu53drawn"
//     },
//     {
//         "code": "2vspq9kr9y",
//         "id": "cc95560e-a98a-44e4-bbb1-e03f74dd3e50",
//         "name": "qcuk5krmgm",
//         "unit": "nplfge2azg"
//     },
//     {
//         "code": "7upqpqggsd",
//         "id": "9981bdc4-892b-4667-9d75-e5587871978b",
//         "name": "ybmyw1zzx7",
//         "unit": "61173mul6q"
//     },
//     {
//         "code": "c2lpr7tgue",
//         "id": "641aa3ee-799e-47a7-85a6-b3aaacf46091",
//         "name": "2fo1jugscd",
//         "unit": "xnpfomna5p"
//     },
//     {
//         "code": "z5fkdpzako",
//         "id": "d7dab6b2-9c5e-4608-a62a-8ebdc2ca4fdd",
//         "name": "8qxb6ocpcm",
//         "unit": "ktdnns5a5q"
//     },
//     {
//         "code": "opkmx686qg",
//         "id": "25e36517-9f5a-4f9f-8b91-26389d7fd29f",
//         "name": "jqgc7eryh4",
//         "unit": "apcjeg0qny"
//     },
//     {
//         "code": "r9tz6q5rk0",
//         "id": "962f134e-3c83-4e18-b5f7-00c4f2335a73",
//         "name": "gdjjpbz1ta",
//         "unit": "mz11b9ry56"
//     },
//     {
//         "code": "54ou8k40tf",
//         "id": "54c70184-9d42-4f5c-9b19-00ecf618ad8b",
//         "name": "i465w69bzw",
//         "unit": "rmj75dwv78"
//     },
//     {
//         "code": "bzvji5ikea",
//         "id": "1fcebd6b-c254-41b0-bde6-20ab94bcf636",
//         "name": "9rgipo09ge",
//         "unit": "fx73sans8j"
//     },
//     {
//         "code": "fm2un3h9rz",
//         "id": "700c014c-7612-40f4-ab16-babafdfd15ee",
//         "name": "ockogid0g1",
//         "unit": "pnli4knnys"
//     },
//     {
//         "code": "wh7mxttlzb",
//         "id": "c4b19a8c-e9e5-464e-a7af-b7c2dda90b76",
//         "name": "cqu33ggt62",
//         "unit": "ep73u1tlpn"
//     },
//     {
//         "code": "x1msn51rvk",
//         "id": "a4bcb618-49e4-46ef-a627-10b0bd51fac8",
//         "name": "1oqtaq7rd9",
//         "unit": "yt3xlf64dg"
//     },
//     {
//         "code": "ivnps8llxn",
//         "id": "df8297c9-6c7b-406d-81db-02ad3c1fe684",
//         "name": "yefxwllyt3",
//         "unit": "s2qee3868f"
//     },
//     {
//         "code": "6la7pv8iqh",
//         "id": "d5be7983-9230-4335-812f-f663849ed032",
//         "name": "x2ilmczr1t",
//         "unit": "1c1yvbkc1v"
//     },
//     {
//         "code": "ojhro9y0w6",
//         "id": "5a6ff9f5-cc93-43e9-ae61-3019cda7b17b",
//         "name": "tdyupqq7qi",
//         "unit": "9f9hem1vgy"
//     },
//     {
//         "code": "ahzvggfw1z",
//         "id": "7dfd9556-654b-45c1-a6b1-2c64b842a51c",
//         "name": "rq0uwbjavt",
//         "unit": "i017ey2ca3"
//     },
//     {
//         "code": "umlt0ynv4h",
//         "id": "41c1e36c-caf9-4577-b4a2-14b52c6e65f1",
//         "name": "ark1foili4",
//         "unit": "nqa2ho1tnw"
//     },
//     {
//         "code": "dg2olpxzds",
//         "id": "fbf4f59a-6423-47bd-a4bc-d3538b044686",
//         "name": "nazjx55p1x",
//         "unit": "cpj41ts824"
//     },
//     {
//         "code": "ck1umy26x7",
//         "id": "088d4334-3fa3-4fd0-938a-d3f2b133dcb6",
//         "name": "c22oh2x4wf",
//         "unit": "056ayyjpxk"
//     },
//     {
//         "code": "06b8htf78e",
//         "id": "110fcac0-ed8d-4c2d-b190-5c4ac6b9a437",
//         "name": "0cra87y4oi",
//         "unit": "evzwupobm3"
//     },
//     {
//         "code": "jsbspfvv80",
//         "id": "6e25e6e2-50c5-461d-9235-fc3e93d381b4",
//         "name": "w8n01m6zqx",
//         "unit": "7l9lvk4r4a"
//     },
//     {
//         "code": "0lqq4qy1q7",
//         "id": "9bb7233e-9aac-4459-ae5d-885dc24870cd",
//         "name": "maqqzppqoo",
//         "unit": "yf3ff1zh7i"
//     },
//     {
//         "code": "jalw4hzn0i",
//         "id": "016a0ebb-0335-4fb9-bbbf-589df53f547e",
//         "name": "qk4y4rucxx",
//         "unit": "p0i9y1z0cw"
//     },
//     {
//         "code": "otcp7ia55q",
//         "id": "59c26540-df08-45a8-b24b-ae2f68d8184f",
//         "name": "xb7bj83661",
//         "unit": "ybyy22fyk4"
//     },
//     {
//         "code": "1bu6zdfo4p",
//         "id": "0ed10684-b5c8-45b9-8c18-b603f719a444",
//         "name": "s5nawzq04o",
//         "unit": "bwiehctx5i"
//     },
//     {
//         "code": "h9vsx0ont5",
//         "id": "64d012ae-97b7-470b-9322-191834c1804a",
//         "name": "t58h3lafrw",
//         "unit": "bw0eetidbd"
//     },
//     {
//         "code": "irezfjrdw5",
//         "id": "3aae68aa-7efb-4add-9867-8a02a1455f67",
//         "name": "2d9bt2zctg",
//         "unit": "ki08jhfokn"
//     },
//     {
//         "code": "wx3fru4gcb",
//         "id": "928a7cdd-49ed-4d08-b96f-496163e40715",
//         "name": "laqud0j8z6",
//         "unit": "pr2naoyrio"
//     },
//     {
//         "code": "53vjutfpzl",
//         "id": "891855d5-d78f-4154-a611-dac96c7f124d",
//         "name": "6ig5t1psvj",
//         "unit": "a4orkvpdme"
//     },
//     {
//         "code": "rto7wb3c3z",
//         "id": "fcb8c810-9e04-4977-a1ce-f94ce4d0b144",
//         "name": "0pnff1pl8z",
//         "unit": "ww0rkdaoeo"
//     },
//     {
//         "code": "tmpfjw58ue",
//         "id": "75784911-d460-41b5-be8a-d192c6418680",
//         "name": "y008tbvymo",
//         "unit": "mz2aqwh28z"
//     },
//     {
//         "code": "598q2lmq9o",
//         "id": "11d6eb62-0cc0-4600-841d-114a82b9403c",
//         "name": "jz93f1tb0g",
//         "unit": "h30llykdbg"
//     },
//     {
//         "code": "5jlyt88auo",
//         "id": "1c882163-80bf-4b68-808e-f2b624ecf2e5",
//         "name": "43wiyh4n2n",
//         "unit": "q775ksx2x9"
//     },
//     {
//         "code": "30yveywmj6",
//         "id": "76e24440-00d4-4004-9770-1b7531a661ea",
//         "name": "tgf1s3p3nz",
//         "unit": "mpr1nm3p1k"
//     },
//     {
//         "code": "m68e91yre6",
//         "id": "83fb8351-f8a9-48bb-aae4-fdae0c47de7f",
//         "name": "bm0pknkxpa",
//         "unit": "xwqcap6qff"
//     },
//     {
//         "code": "f125nyexir",
//         "id": "5c6a60a2-cf35-43ad-808f-02cf4ee4b4d7",
//         "name": "5sebv0kys0",
//         "unit": "uysdbss81w"
//     },
//     {
//         "code": "qhcrrfir59",
//         "id": "65aa5ad0-563e-4be1-a146-b14a1d70f6bd",
//         "name": "uh8xmno7bh",
//         "unit": "mjv4a5rjdf"
//     },
//     {
//         "code": "9elu6kjcle",
//         "id": "13f193eb-3e87-4b16-bf1d-fd0707269704",
//         "name": "v0b19gyuhv",
//         "unit": "tfswpv9jmy"
//     },
//     {
//         "code": "8iu4d4pzat",
//         "id": "99771cc0-47f6-448f-99bc-f8002d02a2e0",
//         "name": "0rkp5z6g60",
//         "unit": "55yu8cl8o9"
//     },
//     {
//         "code": "my7q8n1pk5",
//         "id": "9523c0b4-d087-43ab-978d-6e3b9dfce3d6",
//         "name": "ec2vgm0b49",
//         "unit": "9lhok9l1a1"
//     },
//     {
//         "code": "gtn10gtzpp",
//         "id": "ab1434ef-8bb9-4544-8d35-ba63f687e4f7",
//         "name": "1j34piu0k0",
//         "unit": "fvrb8dou7o"
//     },
//     {
//         "code": "go7ehely6o",
//         "id": "fb404364-1aff-4689-aa7e-6ae4334acdbc",
//         "name": "ae2sarzkns",
//         "unit": "qm8q72j7nq"
//     },
//     {
//         "code": "bnx1rhuszf",
//         "id": "20466822-e3d2-4499-b8bb-caae6f11a010",
//         "name": "d86wg8ta9t",
//         "unit": "qv0v6lxlpe"
//     },
//     {
//         "code": "4ubhlccned",
//         "id": "0308a88a-c1e7-4357-86c9-c857607b0180",
//         "name": "6g3gphcbjn",
//         "unit": "trhhupvkey"
//     },
//     {
//         "code": "81nxmzesmo",
//         "id": "d005c09a-4c84-49a8-ad65-fd42ff2222d4",
//         "name": "atw5aktjv1",
//         "unit": "351v0kuf2t"
//     },
//     {
//         "code": "yri5qw3fqo",
//         "id": "fd04c2f8-b1fe-4516-a52e-f444094dcfe2",
//         "name": "2gt46asihr",
//         "unit": "uvwkhnzwlc"
//     },
//     {
//         "code": "mwscqlnqcv",
//         "id": "d164f8f0-b000-4947-9012-ac5fdba25f3a",
//         "name": "rs6ss3k494",
//         "unit": "aa7eznc879"
//     },
//     {
//         "code": "74c0wraqgz",
//         "id": "692e5d5e-ce51-4410-b1bd-c01f6534c813",
//         "name": "17u5v39p48",
//         "unit": "eurck5z29f"
//     },
//     {
//         "code": "kwc6qe9bgd",
//         "id": "5b767e10-eb81-4086-bddf-e4da5a67b0bf",
//         "name": "tjm7b0l6pw",
//         "unit": "i8866qwkyu"
//     },
//     {
//         "code": "53vwp86akq",
//         "id": "e34b99c7-c2f0-4d5a-8985-164c27c1e10c",
//         "name": "0pou31mkwk",
//         "unit": "re99xgm84e"
//     },
//     {
//         "code": "i3a8oft17p",
//         "id": "7cf0a4f0-029a-4708-8b55-adf5c9d8356a",
//         "name": "8m4yjyfr4x",
//         "unit": "kczjdy34y7"
//     },
//     {
//         "code": "2gid8ugeqa",
//         "id": "09cc49fb-3c5b-41be-9f6d-c57aba264cf6",
//         "name": "3cp0194nqt",
//         "unit": "j2autb5hn2"
//     },
//     {
//         "code": "g89w4batwj",
//         "id": "2b6370d1-8d58-46ab-86d1-013208e6aa1e",
//         "name": "mm8hx5xwyv",
//         "unit": "oozodcd4ab"
//     },
//     {
//         "code": "2ctlaz7y18",
//         "id": "b9305230-2694-4d33-8169-dc2c176af4ec",
//         "name": "dnhupm0hpu",
//         "unit": "zvmvx1kfe4"
//     },
//     {
//         "code": "sole6mnsxm",
//         "id": "1f52f57d-0af6-4807-84b1-01e9e2bd073e",
//         "name": "k6b820vza9",
//         "unit": "ashfyo4q9w"
//     },
//     {
//         "code": "gge6tyxz9d",
//         "id": "b0734bb4-44fc-48f5-bce0-2b30023f5c0d",
//         "name": "7dbgvytkf1",
//         "unit": "3i6jl4r2og"
//     },
//     {
//         "code": "qzlq2b5pto",
//         "id": "9dbf879c-d458-420a-ab02-547133660f2e",
//         "name": "h6bgkcyamc",
//         "unit": "i6ozeemad2"
//     },
//     {
//         "code": "lcoyzoshvt",
//         "id": "3e946d63-58aa-4217-8e3a-d2ccaa94ddbf",
//         "name": "f4sogf07r7",
//         "unit": "yr4dp8yclv"
//     },
//     {
//         "code": "eubukkl850",
//         "id": "2b9eee58-9fd0-495e-819b-46b9a1ad71f9",
//         "name": "u0nbla811u",
//         "unit": "zzul0u9sn8"
//     },
//     {
//         "code": "du0oiq45oe",
//         "id": "aa4f5d3e-8a50-4ef4-8cdc-8d45815f5bf4",
//         "name": "wbzzzvpob4",
//         "unit": "bhrg2h8vtq"
//     },
//     {
//         "code": "04gyqigzrw",
//         "id": "c1b9ac10-ee47-43f3-819e-db6c38c9b659",
//         "name": "5x65mnr5rw",
//         "unit": "92wl4wkfhe"
//     },
//     {
//         "code": "ej9vy286mo",
//         "id": "ed45ee34-0e69-4b14-a005-5d7daa84795a",
//         "name": "kxhecdl3wz",
//         "unit": "wg9ljkcjcq"
//     },
//     {
//         "code": "KT",
//         "id": "d6cb4d13-eb1a-443c-a19d-aa83e5d277fd",
//         "name": "Kim Tiêm",
//         "unit": "Cái"
//     }

// ];

// export default function CreateMaintenace(props: IProps) {
//     const { showModalCreate, setShowModalCreate, equipments, supply } = props;

//     const [type, setType] = useState('');
//     const [replaceMatrial, setReplaceMaterial] = useState([]);
//     const [startAt, setStartAt] = useState('');
//     const [endAt, setEndAt] = useState('');
//     const [description, setDescription] = useState('');
//     const [equipmentIds, setEquipmentIds] = useState<string[]>([]);
//     const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
//     const checkedIcon = <CheckBoxIcon fontSize="small" />;
//     const [selectedSupply, setSelectedSupply] = useState<Supply[]>([]);
//     const [quantityChanges, setQuantityChanges] = useState<SupplyId[]>([]);
//     // const [options, setOptions] = useState([]);
//     // const [searchSupplyCalled, setSearchSupplyCalled] = useState(false);
//     useEffect(() => {
//         if (equipments) {
//             const ids = equipments.map((equipment) => equipment.id);
//             setEquipmentIds(ids);
//         }

//         const initialQuantityChanges = selectedSupply.map((row) => {
//             const existingQuantityChange = quantityChanges.find((item) => item.supplyId === row.id);
//             return existingQuantityChange || { supplyId: row.id, quantity: 1 };
//         });
//         setQuantityChanges(initialQuantityChanges);

//         // if (!searchSupplyCalled) {
//         //     const searchSupply = async () => {
//         //         try {
//         //             const response = await apiClient.get('/supply/search', {
//         //                 params: {
//         //                     page: 0,
//         //                     pageSize: 20,
//         //                     filters: [`search||${FilterComparator.LIKE}||`],
//         //                 },
//         //             });
//         //             const supply = response?.data?.data;
//         //             setOptions(supply);
//         //             setSearchSupplyCalled(true); // Đánh dấu rằng đã gọi searchSupply
//         //         } catch (error) {
//         //             console.error('Lỗi khi gọi API:', error);
//         //         }
//         //     };
//         //     searchSupply();
//         // }
//     }, [equipments, selectedSupply]);


//     const handleCloseModal = () => {
//         setStartAt("");
//         setEquipmentIds([]);
//         setDescription('');
//         setReplaceMaterial([]);
//         setEndAt('');
//         setType('');
//         setShowModalCreate(false);
//     };
//     const handleCreateMaintenance = async () => {
//         if (!startAt) {
//             toast.error("Không để trống ngày bắt đầu")
//             return;
//         }
//         if (!endAt) {
//             toast.error("Không để trống ngày kết thúc")
//             return;
//         }
//         if (!description) {
//             toast.error("Không để trống nội dung công việc")
//             return;
//         }
//         if (!type) {
//             toast.error("Không để trống loại đơn")
//             return;
//         }
//         try {
//             const response = await apiClient.post(`/repair-report`, {
//                 type: type,
//                 description: description,
//                 startAt: startAt,
//                 endAt: endAt,
//                 equipmentIds: equipmentIds,
//                 replaceItems: quantityChanges
//             });
//             if (response.status === 201 || response.status === 200) {
//                 toast.success("Cập nhật thành công");
//                 // Thực hiện các hành động khác sau khi cập nhật thành công
//             }
//         } catch (error) {
//             toast.error("Cập nhật thất bại");
//             // Xử lý lỗi khi gọi API
//         }

//         handleCloseModal();
//     };

//     const handleQuantityChange = (id: string, quantity: number,) => {
//         const updatedQuantityChanges = quantityChanges.map((item) => {
//             if (item.supplyId === id) {
//                 return { ...item, quantity };
//             }
//             return item;
//         });
//         setQuantityChanges(updatedQuantityChanges);
//     };
//     const handleChangeType = (event: any) => {
//         setType(event.target.value);
//     };



//     const handleSelectionChange = (event: React.SyntheticEvent, newValue: any) => {
//         setSelectedSupply(newValue);
//     };

//     return (
//         <Dialog
//             open={showModalCreate}
//             onClose={handleCloseModal}
//             scroll='paper'
//             aria-labelledby="scroll-dialog-title"
//             aria-describedby="scroll-dialog-description"
//             fullWidth
//             maxWidth='md'
//         >
//             <DialogTitle className="title-text" id="scroll-dialog-title">TẠO ĐƠN BẢO TRÌ</DialogTitle>
//             <DialogContent sx={{ color: "rgb(0, 167, 111)" }} dividers>
//                 <DialogTitle>Chi tiết bảo trì</DialogTitle>
//                 <Grid container spacing={2}>
//                     <Grid item xs={2.5}>
//                         <Typography variant="body1" style={{ marginLeft: "40px", marginTop: "10px" }}>Ngày bắt đầu:</Typography>
//                     </Grid>
//                     <Grid item xs={3}>
//                         <FormControl fullWidth sx={{ width: "100%" }}>
//                             <TextField
//                                 type="date"
//                                 id="startImportDate"
//                                 variant="outlined"
//                                 fullWidth
//                                 value={startAt}
//                                 onChange={(e) => setStartAt(e.target.value)}
//                                 inputProps={{
//                                     style: { height: "0px" },
//                                 }}
//                                 style={{ marginTop: "5px" }}
//                                 sx={{
//                                     "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
//                                         borderColor: "black",
//                                     },
//                                 }}
//                             />
//                         </FormControl>
//                     </Grid>
//                     <Grid item xs={2.5}>
//                         <Typography variant="body1" style={{ marginLeft: "40px", marginTop: "10px" }}>
//                             Ngày kết thúc:
//                         </Typography>

//                     </Grid>
//                     <Grid item xs={3}>
//                         <FormControl fullWidth sx={{ width: "100%" }}>
//                             <TextField
//                                 type="date"
//                                 id="endImportDate"
//                                 variant="outlined"
//                                 fullWidth
//                                 value={endAt}
//                                 onChange={(e) => setEndAt(e.target.value)}
//                                 inputProps={{
//                                     style: { height: "0px" },
//                                 }}
//                                 style={{ marginTop: "5px" }}
//                                 sx={{
//                                     "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
//                                         borderColor: "black",
//                                     },
//                                 }}
//                             />
//                         </FormControl>
//                     </Grid>
//                     <Grid item xs={2.5}>
//                         <Typography variant="body1" style={{ marginLeft: "40px", marginTop: "10px" }}>
//                             Loại đơn:
//                         </Typography>
//                     </Grid>

//                     <Grid item xs={8.5}>
//                         <FormControl fullWidth sx={{ width: "100%" }} size='small'>
//                             <Select
//                                 labelId="demo-simple-select-label"
//                                 id="demo-simple-select"
//                                 value={type}
//                                 inputProps={{
//                                     style: { height: "0px" },
//                                 }}
//                                 style={{ marginTop: "5px" }}
//                                 sx={{
//                                     "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
//                                         borderColor: "black",
//                                     },
//                                 }}
//                                 onChange={handleChangeType}
//                             >
//                                 <MenuItem value={"FIXING"}>Bảo trì</MenuItem>
//                                 <MenuItem value={"REPAIR"}>Sửa chữa</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </Grid>
//                     <Grid item xs={2.5}>
//                         <Typography variant="body1" style={{ marginLeft: "40px", marginTop: "10px" }}>
//                             Nội dung công việc:
//                         </Typography>
//                     </Grid>
//                     <Grid item xs={8.5}>
//                         <FormControl fullWidth sx={{ width: "100%" }}>
//                             <TextField
//                                 multiline
//                                 rows={4}
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                             />
//                         </FormControl>
//                     </Grid>
//                     <Grid item xs={2.5}>
//                         <Typography variant="body1" style={{ marginLeft: "40px", marginTop: "10px" }}>
//                             Người thực hiện:
//                         </Typography>
//                     </Grid>
//                     <Grid item xs={8.5}>
//                         <FormControl fullWidth sx={{ width: "100%" }}>
//                             <TextField
//                                 multiline
//                                 rows={2}
//                             />
//                         </FormControl>
//                     </Grid>
//                 </Grid>
//                 <DialogTitle>Danh sách thiết bị:</DialogTitle>
//                 <TableContainer component={Paper}>
//                     <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell >Mã thiết bị</TableCell>
//                                 <TableCell align="right">Tên thiết bị</TableCell>
//                                 <TableCell align="right">Loại thiết bị</TableCell>
//                                 <TableCell align="right">Phòng ban</TableCell>
//                                 <TableCell align="right">Chu kỳ bảo trì&nbsp;(tháng)</TableCell>
//                                 <TableCell align="right">Ngày bảo trì gần nhất</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {equipments?.map((row) => (
//                                 <TableRow
//                                     key={row.id}
//                                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                                 >
//                                     <TableCell align="right">{row?.code}</TableCell>
//                                     <TableCell align="right">{row?.name}</TableCell>
//                                     <TableCell align="right">{row?.equipmentCategory?.name}</TableCell>
//                                     <TableCell align="right">{row?.department?.name}</TableCell>
//                                     <TableCell align="right">{row?.equipmentMaintainSchedule?.cycleMaintainPerMonth}</TableCell>
//                                     <TableCell align="right">{row?.equipmentMaintainSchedule?.lastMaintainDate ? format(new Date(row?.equipmentMaintainSchedule?.lastMaintainDate), 'dd/MM/yyyy') : ''}</TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//                 <DialogTitle>Vật tư thay thế dự kiến:</DialogTitle>
//                 <Grid item xs={2.5}>
//                     <Typography variant="body1" style={{ marginLeft: "40px", marginTop: "10px" }}>
//                         Tìm kiếm:
//                     </Typography>
//                 </Grid>
//                 <Grid item xs={5}>
//                     <Autocomplete
//                         multiple
//                         id="checkboxes-tags-demo"
//                         options={top100Films}
//                         disableCloseOnSelect
//                         getOptionLabel={(option) => option.name}
//                         value={selectedSupply}
//                         onChange={handleSelectionChange}
//                         renderOption={(props, option, { selected }) => (
//                             <li {...props}>
//                                 <Checkbox
//                                     icon={icon}
//                                     checkedIcon={checkedIcon}
//                                     style={{ marginRight: 8 }}
//                                     checked={selected}
//                                 />
//                                 {option.name} {option.code}
//                             </li>
//                         )}
//                         style={{ width: 840 }}
//                         renderInput={(params) => (
//                             <TextField {...params} placeholder="Vật tư" />
//                         )}
//                     />
//                 </Grid>
//                 <Grid item xs={2.5}>
//                     <Typography variant="body1" style={{ marginLeft: "40px", marginTop: "10px" }}>
//                         Danh sách vật tư:
//                     </Typography>
//                 </Grid>
//                 <TableContainer component={Paper}>
//                     <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell align="right" >Mã vật tư</TableCell>
//                                 <TableCell align="right">Tên vật tư</TableCell>
//                                 <TableCell align="right">Đơn vị tính</TableCell>
//                                 <TableCell align="right">Số lượng</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {selectedSupply?.map((row) => (
//                                 <TableRow
//                                     key={row.id}
//                                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                                 >
//                                     <TableCell align="right">{row?.code}</TableCell>
//                                     <TableCell align="right">{row?.name}</TableCell>
//                                     <TableCell align="right">{row?.unit}</TableCell>
//                                     <TableCell align="right">
//                                         <TextField
//                                             type="number"
//                                             value={quantityChanges.find((item) => item.supplyId === row.id)?.quantity || 1}
//                                             inputProps={{ min: 1, max: 10 }}
//                                             onChange={(e) => handleQuantityChange(row.id, +e.target.value)}
//                                         />
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </DialogContent>
//             <DialogActions>
//                 <Button
//                     sx={{ color: 'rgb(0, 167, 111)' }}
//                     onClick={handleCloseModal}
//                 >Huỷ</Button>
//                 <Button
//                     variant="contained"
//                     color='success'
//                     sx={{ backgroundColor: 'rgb(0, 167, 111)', color: '#fff' }}
//                     onClick={handleCreateMaintenance}
//                 >Xác nhận</Button>
//             </DialogActions>
//         </Dialog>

//     );

// }