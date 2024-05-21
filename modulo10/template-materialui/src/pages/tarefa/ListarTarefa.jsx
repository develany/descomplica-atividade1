import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';

import CriarTarefa from './CriarTarefa';
import EditarTarefa from './EditarTarefa';

// Função para criar os dados iniciais das tarefas
function createData(idTarefa, tituloTarefa, descricaoTarefa, inicioTarefa, fimTarefa, statusTarefa, recursoTarefa) {
  return { idTarefa, tituloTarefa, descricaoTarefa, inicioTarefa, fimTarefa, statusTarefa, recursoTarefa };
}

// Dados iniciais das tarefas
const initialRows = [
  createData(1, 'Tarefa 1', 'Descrição da Tarefa 1', '2022-01-01', '2022-01-02', 'Concluída', 'Recurso 1'),
  createData(2, 'Tarefa 2', 'Descrição da Tarefa 2', '2022-01-03', '2022-01-04', 'Em Andamento', 'Recurso 2'),
  createData(3, 'Tarefa 3', 'Descrição da Tarefa 3', '2022-01-04', '2022-01-05', 'Em Andamento', 'Recurso 3'),
  createData(4, 'Tarefa 4', 'Descrição da Tarefa 4', '2022-01-05', '2022-01-06', 'Em Andamento', 'Recurso 4'),
  createData(5, 'Tarefa 5', 'Descrição da Tarefa 5', '2022-01-06', '2022-01-07', 'Em Andamento', 'Recurso 5'),
  createData(6, 'Tarefa 6', 'Descrição da Tarefa 6', '2022-01-07', '2022-01-08', 'Aguardando', 'Recurso 6'),
];

const ListarTarefa = () => {
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState();
  const [idTarefaSelecionada, setIdTarefaSelecionada] = useState([]);

  useEffect(() => {
    setTarefas(initialRows);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEditar = () => setOpenEditar(true);
  const handleCloseEditar = () => setOpenEditar(false);

  const handleEditar = (id) => {
    setIdTarefaSelecionada(id);
    const tarefaParaEditar = tarefas.find((tarefa) => tarefa.idTarefa === id);
    setTarefa(tarefaParaEditar);
    setOpenEditar(true);
  };

  const handleDeletar = (id) => {
    setTarefas(tarefas.filter((tarefa) => tarefa.idTarefa !== id));
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#4caf50',
      },
      secondary: {
        main: '#f44336',
      },
    },
    typography: {
      fontFamily: 'Arial, sans-serif',
      h6: {
        fontSize: 18,
        fontWeight: 700,
      },
      body2: {
        fontSize: 14,
      },
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: '8px 16px',
          },
          head: {
            backgroundColor: '#f5f5f5',
            fontWeight: 600,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            margin: '0 4px',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Card>
        <CardHeader title="Tarefas" subheader="Listagem de Tarefas" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Título</TableCell>
                  <TableCell align="right">Descrição</TableCell>
                  <TableCell align="right">Data de Início</TableCell>
                  <TableCell align="right">Data de Finalização</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Recurso</TableCell>
                  <TableCell align="center">Editar</TableCell>
                  <TableCell align="center">Deletar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tarefas.map((row) => (
                  <TableRow key={row.idTarefa} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.idTarefa}
                    </TableCell>
                    <TableCell>{row.tituloTarefa}</TableCell>
                    <TableCell align="right">{row.descricaoTarefa}</TableCell>
                    <TableCell align="right">{row.inicioTarefa}</TableCell>
                    <TableCell align="right">{row.fimTarefa}</TableCell>
                    <TableCell align="right">{row.statusTarefa}</TableCell>
                    <TableCell align="right">{row.recursoTarefa}</TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="primary" onClick={() => handleEditar(row.idTarefa)}>
                        <EditIcon fontSize="small" />
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="secondary" onClick={() => handleDeletar(row.idTarefa)}>
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" color="primary" onClick={handleOpen}>
            Criar Tarefa
          </Button>
          <Button size="small" variant="outlined" color="secondary">
            Cancelar
          </Button>
        </CardActions>
      </Card>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Criar Tarefa
          </Typography>
          <CriarTarefa handleClose={handleClose} tarefas={tarefas} setTarefas={setTarefas} />
        </Box>
      </Modal>
      <Modal open={openEditar} onClose={handleCloseEditar}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Editar Tarefa
          </Typography>
          <EditarTarefa
            handleCloseEditar={handleCloseEditar}
            idTarefaSelecionada={idTarefaSelecionada}
            tarefas={tarefas}
            tarefa={tarefa}
            setTarefas={setTarefas}
          />
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default ListarTarefa;