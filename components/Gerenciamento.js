import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, ActivityIndicator, ToastAndroid } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import * as firebase from 'firebase';

class Gerenciamento extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loader: true,
            erro: false,
            listaRegistros: [],
            tabelaCabecalho: ['Dia', 'R 1', 'R 2', 'R 3', 'R 4', 'Saldo'],
            tabelaDados: [],
            saldoTotal: '00:00',
            exibeToaster: false,
            anoAtual: 0,
            mesAtual: ''
        }
    }

    UNSAFE_componentWillMount() {
        this.buscarRegistros();
    }

    render() {
        return (
            <View style={styles.global}>
                {this.state.loader ?
                    <ActivityIndicator size={150} color="#301b92" style={styles.loader} />
                    :
                    this.state.erro ?
                        <View>
                            <Text style={styles.msgErro}>Erro ao carregar os dados</Text>
                        </View>
                        :
                        <View style={styles.dados}>
                            <View style={styles.dadosGerais}>
                                <Text>{this.state.mesAtual} de {this.state.anoAtual}</Text>
                                {this.state.saldoTotal.indexOf('-') === -1 ?
                                    <Text style={styles.msgSucesso}>Saldo: {this.state.saldoTotal}</Text> :
                                    <Text style={styles.msgErro}>Saldo: {this.state.saldoTotal}</Text>}
                            </View>
                            <View style={styles.tabela}>
                                <Table borderStyle={styles.tabelaCabecalho}>
                                    <Row data={this.state.tabelaCabecalho} textStyle={styles.tabelaTexto} />
                                </Table>
                                <ScrollView style={styles.scroll}>
                                    <Table borderStyle={styles.tabelaRegistros}>
                                        <Rows data={this.state.tabelaDados} textStyle={styles.tabelaTexto} />
                                    </Table>
                                </ScrollView>
                            </View>
                            <View style={styles.btnRegistro}>
                                <Button
                                    title="Registro"
                                    onPress={() =>
                                        this.props.navigation.navigate('Registro')
                                    }
                                />
                            </View>
                        </View >
                }
            </View>
        );
    }

    buscarRegistros = () => {
        let dataAtual = new Date();
        let meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        let mesAtual = meses[dataAtual.getMonth()]

        firebase
            .database()
            .ref("Registros " + dataAtual.getFullYear() + "/" + mesAtual)
            .on("value", (snapshot) => {
                this.setState({ exibeToaster: true })
                let listaRegistros = snapshot.val();
                this.setState({ listaRegistros: listaRegistros });
                let registro = ''
                let data = []
                let dataFinal = this.state.tabelaDados
                let listaSaldo = []
                let indice = ''

                for (var i = 0; i < 31; i++) {
                    indice = i
                    if (i < 10) {
                        indice = '0' + i
                    }
                    registro = this.state.listaRegistros['Dia ' + indice]
                    if (registro !== undefined) {
                        data = []
                        data.push(indice)
                        data.push(registro['Entrada'])
                        data.push(registro['Pausa Almoço'])
                        data.push(registro['Retorno Almoço'])
                        data.push(registro['Saida'])
                        data.push(registro['Saldo'])
                        dataFinal.push(data)

                        listaSaldo.push(registro['Saldo'])
                    }
                }
                this.setState({ tabelaDados: dataFinal, mesAtual: mesAtual, anoAtual: dataAtual.getFullYear() })

                this.calularSaldoTotal(listaSaldo);
                this.setState({ loader: false });
            }, function (error) {
                this.setState({ erro: true })
            })
    }

    calularSaldoTotal = (listaSaldo) => {
        let saldoHora = 0
        let saldoMin = 0
        let saldoTotalHora = 0
        let saldoTotalMin = 0

        listaSaldo.forEach(saldo => {
            // para cada saldo, pega o valor da hora e do minuto
            saldoHora = parseInt(saldo.substring(0, saldo.indexOf(':')));
            saldoMin = parseInt(saldo.substring(saldo.indexOf(':') + 1, saldo.length));

            // se a hora for negativa, o minuto é negativo
            saldoMin = saldo.indexOf('-') > -1 ? saldoMin * -1 : saldoMin

            // soma o saldo da lista com o saldo total
            saldoTotalHora = saldoTotalHora + saldoHora
            saldoTotalMin = saldoTotalMin + saldoMin

            // tratamento quando atingir 1h no somatório dos minutos
            if (saldoTotalMin >= 60) {
                saldoTotalHora++;
                saldoTotalMin = saldoTotalMin - 60
            } else if (saldoTotalMin <= -60) {
                saldoTotalHora--;
                saldoTotalMin = (saldoTotalMin + 60) * -1
            }
        });

        // colocar 0 a mais na frente quando tiver 1 unidade de hora
        saldoTotalHora = saldoTotalHora === 0 ? '00' : saldoTotalHora

        // colocar 0 a mais na frente quando tiver 1 unidade de minuto e colocar sinal de - na frente da hora
        if (saldoTotalMin === 0) {
            saldoTotalMin = '00'
        } else if (saldoTotalMin < 10 && saldoTotalMin > 0) {
            saldoTotalMin = '0' + saldoTotalMin
        } else if (saldoTotalMin < 0 && saldoTotalMin > -10) {
            saldoTotalMin = '0' + saldoTotalMin * -1
            if (saldoTotalHora > 0 || saldoTotalHora === '00') {
                saldoTotalHora = '-' + saldoTotalHora
            }
        } else if (saldoTotalMin <= -10) {
            saldoTotalMin = saldoTotalMin * -1
            if (saldoTotalHora > 0 || saldoTotalHora === '00') {
                saldoTotalHora = '-' + saldoTotalHora
            }
        }

        this.setState({ saldoTotal: saldoTotalHora + ':' + saldoTotalMin })
    }
}

const styles = StyleSheet.create({
    global: {
        flex: 1,
        justifyContent: 'center',
    },
    dados: {
        backgroundColor: 'white',
        flex: 1
    },
    dadosGerais: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.1,
    },
    tabela: {
        flex: 0.8,
    },
    tabelaCabecalho: {
        borderWidth: 2,
        borderColor: '#c8e1ff',
    },
    tabelaTexto: {
        margin: 6
    },
    tabelaRegistros: {
        borderWidth: 2,
        borderColor: '#c8e1ff',
    },
    scroll: {
        height: 50
    },
    btnRegistro: {
        bottom: 0,
        position: 'absolute',
        width: '100%',
    },
    loader: {
        justifyContent: 'center',
        flex: 0.8,
    },
    msgErro: {
        color: 'red',
    },
    msgSucesso: {
        color: 'green',
    }
});

export default Gerenciamento;