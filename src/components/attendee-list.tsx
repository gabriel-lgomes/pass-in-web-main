import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Search,
  ChevronsLeft,
  ChevronsRight,
  SquarePen,
  Trash,
} from "lucide-react";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { formatRelative } from "date-fns/formatRelative";
import { ptBR } from "date-fns/locale";
import useFetch from "../hooks/useFetch";
import ReactPaginate from "react-paginate";
import { UsersInterface } from "../interfaces/users";
import { Modal } from "./modal";
import { newData } from "../interfaces/newData";

export function AttendeeList() {
  const urlAPI = import.meta.env.VITE_API_URL;
  const [url, setUrl] = useState(urlAPI);
  const { data } = useFetch(url);
  const search = useRef<HTMLInputElement>(null);
  const [page, setPage] = useState(0);
  const [filterData, setFilterData] = useState<UsersInterface[]>([]);
  const [dataModal, setDataModal] = useState<newData>({
    id: 1,
    name: "",
    email: "",
  });
  const itemsPerPage = 20;
  const [openModal, setOpenModal] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);

  useEffect(() => {
    if (data) {
      const filtered = data.filter(
        (item: any, index: number) =>
          index >= page * itemsPerPage && index < (page + 1) * itemsPerPage
      );
      setFilterData(filtered);
    }
  }, [data, page]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setTimeout(() => {
      setUrl(`${urlAPI}/?q=${e.target.value}`);
    }, 500);
  }

  function handleModal({ id, email, name }: newData) {
    setOpenModal(true);
    setDataModal({ id, email, name });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 py-1.5 border border-white/10 rounded-lg text-sm w-72 flex items-center gap-3">
          <Search width={16} className="text-emerald-300" />
          <input
            className="bg-transparent flex-1 border-0 text-sm focus:ring-0 focus:border-0"
            placeholder="Buscar participante..."
            ref={search}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader
              style={{ width: 48 }}
              className="py-3 px-4 text-sm font-semibold text-left"
            >
              <input
                className="bg-black/20 rounded border border-white/18 text-orange-400 outline-none focus:ring-0"
                type="checkbox"
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {filterData.map(({ id, name, email, createdAt, checkedInAt }) => (
            <TableRow
              key={id}
              className="border-b border-white/10 hover:bg-white/5"
            >
              <TableCell>
                <input
                  className="bg-black/20 rounded border border-white/18 text-orange-400 outline-none focus:ring-0"
                  type="checkbox"
                />
              </TableCell>
              <TableCell>{id}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-zinc-50">{name}</span>
                  <span>{email}</span>
                </div>
              </TableCell>
              <TableCell>
                {formatRelative(createdAt, new Date(), {
                  locale: ptBR,
                })}
              </TableCell>
              <TableCell>
                {formatRelative(checkedInAt, new Date(), {
                  locale: ptBR,
                })}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <IconButton transparent={true}>
                    <SquarePen
                      size={16}
                      onClick={() => handleModal({ id, name, email })}
                    />
                  </IconButton>
                  <IconButton transparent={true}>
                    <Trash
                      size={16}
                      onClick={() => {
                        handleModal({ id, name, email });
                        setDeleteUser(true);
                      }}
                    />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <ReactPaginate
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        activeClassName={"active text-[#f48f56] font-bold"}
        className="flex items-center justify-end gap-4"
        onPageChange={(event) => setPage(event.selected)}
        pageCount={Math.ceil((data?.length ?? 0) / itemsPerPage)}
        breakLabel="..."
        previousLabel={
          <IconButton>
            <ChevronsLeft size={16} />
          </IconButton>
        }
        nextLabel={
          <IconButton>
            <ChevronsRight size={16} />
          </IconButton>
        }
      />
      <Modal
        dataModal={dataModal}
        isVisible={openModal}
        deleteUser={deleteUser}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}
