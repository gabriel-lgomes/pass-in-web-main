import {
  Search,
  MoreHorizontal,
  ChevronsLeft,
  ChevronLeft,
  ChevronsRight,
  ChevronRight,
} from "lucide-react";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { formatRelative } from "date-fns/formatRelative";
import { ptBR } from "date-fns/locale";
import useFetch from "../hooks/useFetch";
import { ChangeEvent, useRef, useState } from "react";

export function AttendeeList() {
  const urlAPI = "http://localhost:3000/users";
  const [url, setUrl] = useState(urlAPI);
  const { data } = useFetch(url);
  const search = useRef<HTMLInputElement>(null);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setTimeout(() => {
      setUrl(`${urlAPI}/?q=${e.target.value}`);
    }, 500);
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
          {data &&
            data.map((attendees) => (
              <TableRow
                key={attendees.id}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <TableCell>
                  <input
                    className="bg-black/20 rounded border border-white/18 text-orange-400 outline-none focus:ring-0"
                    type="checkbox"
                  />
                </TableCell>
                <TableCell>{attendees.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-zinc-50">
                      {attendees.name}
                    </span>
                    <span>{attendees.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {formatRelative(attendees.createdAt, new Date(), {
                    locale: ptBR,
                  })}
                </TableCell>
                <TableCell>
                  {formatRelative(attendees.checkedInAt, new Date(), {
                    locale: ptBR,
                  })}
                </TableCell>
                <TableCell>
                  <IconButton transparent={true}>
                    <MoreHorizontal size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </tbody>
        <tfoot>
          <TableRow>
            <TableCell colSpan={3}>Mostrando 1 de 200 itens</TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex gap-8 items-center">
                <span>Página 1 de 10</span>

                <div className="flex gap-1.5">
                  <IconButton>
                    <ChevronsLeft size={16} />
                  </IconButton>
                  <IconButton>
                    <ChevronLeft size={16} />
                  </IconButton>
                  <IconButton>
                    <ChevronRight size={16} />
                  </IconButton>
                  <IconButton>
                    <ChevronsRight size={16} />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </tfoot>
      </Table>
    </div>
  );
}
