import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Button } from 'react-native';
import * as firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons';


/*TP: Time Picker*/
import TPregistroEntrada from "react-native-24h-timepicker";
import TPregistroSaidaAlmoco from "react-native-24h-timepicker";
import TPregistroRetornoAlmoco from "react-native-24h-timepicker";
import TPregistroSaida from "react-native-24h-timepicker";

const RegistroEnum = {
    Entrada: 0,
    SaidaAlmoco: 1,
    RetornoAlmoco: 2,
    Saida: 3
}

class Registro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            registroEntrada: '',
            registroSaidaAlmoco: '',
            registroRetornoAlmoco: '',
            registroSaida: '',
            sucesso: false,
            erro: false,
        }
    }

    render() {
        return (
            <View style={styles.global}>
                {this.state.loader ?
                    <ActivityIndicator size={150} color="#301b92" style={styles.loader} />
                    :
                    < View style={styles.container} >
                        {/* Entrada */}
                        < View style={styles.containerRegistro}>
                            {
                                this.state.registroEntrada === '' ?
                                    <TouchableOpacity
                                        onPress={() => this.TPregistroEntrada.open()}
                                    >
                                        <Text style={styles.btnRegistroTexto}>Entrada</Text>
                                    </TouchableOpacity> :
                                    <View style={styles.registro}>
                                        <Text style={styles.registroInfo}>Entrada: {this.state.registroEntrada}</Text>
                                        <TouchableOpacity
                                            onPress={() => this.TPregistroEntrada.open()}
                                        >
                                            <AntDesign name="edit" size={24} color="green" />
                                        </TouchableOpacity>
                                    </View>
                            }
                            < TPregistroEntrada
                                ref={ref => {
                                    this.TPregistroEntrada = ref;
                                }
                                }
                                selectedHour="8"
                                textCancel="Cancelar"
                                textConfirm="Confirmar"
                                onCancel={() => this.cancelarRegistro(RegistroEnum.Entrada)}
                                onConfirm={(hour, minute) => this.confirmarRegistro(hour, minute, RegistroEnum.Entrada)}
                            />
                        </View >
                        {/* Saída Almoço*/}
                        {
                            this.state.registroEntrada !== '' ?
                                <View style={styles.containerRegistro}>
                                    {this.state.registroSaidaAlmoco === '' ?
                                        <TouchableOpacity
                                            onPress={() => this.TPregistroSaidaAlmoco.open()}
                                        >
                                            <Text style={styles.btnRegistroTexto}>Saída Almoço</Text>
                                        </TouchableOpacity> :
                                        <View style={styles.registro}>
                                            <Text style={styles.registroInfo}>Saída almoço: {this.state.registroSaidaAlmoco}</Text>
                                            <TouchableOpacity
                                                onPress={() => this.TPregistroSaidaAlmoco.open()}
                                            >
                                                <AntDesign name="edit" size={24} color="green" />
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    <TPregistroSaidaAlmoco
                                        ref={ref => {
                                            this.TPregistroSaidaAlmoco = ref;
                                        }}
                                        selectedHour="12"
                                        textCancel="Cancelar"
                                        textConfirm="Confirmar"
                                        onCancel={() => this.cancelarRegistro(RegistroEnum.SaidaAlmoco)}
                                        onConfirm={(hour, minute) => this.confirmarRegistro(hour, minute, RegistroEnum.SaidaAlmoco)}
                                    />
                                </View > :
                                <View style={styles.registro}>
                                    <Text style={styles.registroInfoDesabilitado}>Saída almoço</Text>
                                </View>
                        }
                        {/* Retorno Almoço */}
                        {
                            this.state.registroSaidaAlmoco !== '' ?
                                <View style={styles.containerRegistro}>
                                    {this.state.registroRetornoAlmoco === '' ?
                                        <TouchableOpacity
                                            onPress={() => this.TPregistroRetornoAlmoco.open()}
                                        >
                                            <Text style={styles.btnRegistroTexto}>Retorno Almoço</Text>
                                        </TouchableOpacity>
                                        :
                                        <View style={styles.registro}>
                                            <Text style={styles.registroInfo}>Retorno almoço: {this.state.registroRetornoAlmoco}</Text>
                                            <TouchableOpacity
                                                onPress={() => this.TPregistroRetornoAlmoco.open()}
                                            >
                                                <AntDesign name="edit" size={24} color="green" />
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    <TPregistroRetornoAlmoco
                                        ref={ref => {
                                            this.TPregistroRetornoAlmoco = ref;
                                        }}
                                        selectedHour="13"
                                        textCancel="Cancelar"
                                        textConfirm="Confirmar"
                                        onCancel={() => this.cancelarRegistro(RegistroEnum.RetornoAlmoco)}
                                        onConfirm={(hour, minute) => this.confirmarRegistro(hour, minute, RegistroEnum.RetornoAlmoco)}
                                    />
                                </View> :
                                <View style={styles.registro}>
                                    <Text style={styles.registroInfoDesabilitado}>Retorno almoço</Text>
                                </View>
                        }
                        {/* Saída */}
                        {
                            this.state.registroRetornoAlmoco !== '' ?
                                <View style={styles.containerRegistro}>
                                    {this.state.registroSaida === '' ?
                                        <TouchableOpacity
                                            onPress={() => this.TPregistroSaida.open()}
                                        >
                                            <Text style={styles.btnRegistroTexto}>Saída</Text>
                                        </TouchableOpacity>
                                        :
                                        <View style={styles.registro}>
                                            <Text style={styles.registroInfo}>Saída: {this.state.registroSaida}</Text>
                                            <TouchableOpacity
                                                onPress={() => this.TPregistroSaida.open()}
                                            >
                                                <AntDesign name="edit" size={24} color="green" />
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    <TPregistroSaida
                                        ref={ref => {
                                            this.TPregistroSaida = ref;
                                        }}
                                        selectedHour="17"
                                        textCancel="Cancelar"
                                        textConfirm="Confirmar"
                                        onCancel={() => this.cancelarRegistro(RegistroEnum.Saida)}
                                        onConfirm={(hour, minute) => this.confirmarRegistro(hour, minute, RegistroEnum.Saida)}
                                    />
                                </View> :
                                <View style={styles.registro}>
                                    <Text style={styles.registroInfoDesabilitado}>Saída</Text>
                                </View>
                        }

                        {
                            this.state.registroSaida !== '' ?
                                <View style={styles.containerBtnRegistro}>
                                    < TouchableOpacity>
                                        <Button
                                            title='Registrar'
                                            color='green'
                                            onPress={() => this.registrarPonto()}
                                        />
                                    </TouchableOpacity>
                                    {this.state.sucesso ?
                                        <Text style={styles.msgSucesso}>Registrado com sucesso!</Text>
                                        : null
                                    }
                                    {this.state.erro ?
                                        <Text style={styles.msgErro}>Erro ao cadastrar!</Text>
                                        : null}
                                </View> :
                                <View style={styles.btnRegistrar}>
                                    < TouchableOpacity>
                                        <Button
                                            title='Registrar'
                                            color='gray'
                                        />
                                    </TouchableOpacity>
                                </View>
                        }
                        <View style={styles.btnGerenciamento}>
                            <Button
                                title="Gerenciamento"
                                onPress={() =>
                                    this.props.navigation.navigate('Gerenciamento')
                                }
                            />
                        </View>
                    </View >
                }
            </View>
        );
    }

    cancelarRegistro(registro) {
        switch (registro) {
            case RegistroEnum.Entrada:
                this.TPregistroEntrada.close();
                break;
            case RegistroEnum.SaidaAlmoco:
                this.TPregistroSaidaAlmoco.close();
                break;
            case RegistroEnum.RetornoAlmoco:
                this.TPregistroRetornoAlmoco.close();
                break;
            case RegistroEnum.Saida:
                this.TPregistroSaida.close();
                break;
            default:
                break;
        }
    }

    confirmarRegistro(hora, minuto, registro) {
        switch (registro) {
            case RegistroEnum.Entrada:
                this.setState({ registroEntrada: `${hora}:${minuto}` });
                this.TPregistroEntrada.close();
                break;
            case RegistroEnum.SaidaAlmoco:
                this.setState({ registroSaidaAlmoco: `${hora}:${minuto}` });
                this.TPregistroSaidaAlmoco.close();
                break;
            case RegistroEnum.RetornoAlmoco:
                this.setState({ registroRetornoAlmoco: `${hora}:${minuto}` });
                this.TPregistroRetornoAlmoco.close();
                break;
            case RegistroEnum.Saida:
                this.setState({ registroSaida: `${hora}:${minuto}` });
                this.TPregistroSaida.close();
                break;
            default:
                break;
        }
    }

    registrarPonto = () => {
        this.setState({ loader: true })
        let dataAtual = new Date();
        let tabelaNome = this.criarNomeTabela(dataAtual);
        let saldo = this.calcularSaldo();

        firebase.database().ref(tabelaNome).update({
            'Entrada': this.state.registroEntrada,
            'Pausa Almoço': this.state.registroSaidaAlmoco,
            'Retorno Almoço': this.state.registroRetornoAlmoco,
            'Saida': this.state.registroSaida,
            'Saldo': saldo
        }).then((response) => {
            this.setState({
                loader: false,
                sucesso: true,
            })
        }).catch((error) => {
            this.setState({ erro: true })
        });
    }

    calcularSaldo = () => {
        let entrada = this.state.registroEntrada;
        let saidaAlmoco = this.state.registroSaidaAlmoco;
        let retornoAlmoco = this.state.registroRetornoAlmoco;
        let saida = this.state.registroSaida;
        let saldoSinal = '';

        let entradaHora = parseInt(entrada.substring(0, entrada.indexOf(':')));
        let entradaMin = parseInt(entrada.substring(entrada.indexOf(':') + 1, entrada.length));

        let saidaAlmocoHora = saidaAlmoco.substring(0, saidaAlmoco.indexOf(':'));
        let saidaAlmocoMin = parseInt(saidaAlmoco.substring(saidaAlmoco.indexOf(':') + 1, saidaAlmoco.length));

        let retornoAlmocoHora = retornoAlmoco.substring(0, retornoAlmoco.indexOf(':'));
        let retornoAlmocoMin = parseInt(retornoAlmoco.substring(retornoAlmoco.indexOf(':') + 1, retornoAlmoco.length));

        let saidaHora = parseInt(saida.substring(0, saida.indexOf(':')));
        let saidaMin = parseInt(saida.substring(saida.indexOf(':') + 1, saida.length));

        // calculando diferença entre saída e entrada
        let dataEntrada = new Date(2020, 11, 11, entradaHora, entradaMin, 0, 0)
        let dataSaida = new Date(2020, 11, 11, saidaHora, saidaMin, 0, 0)
        let difEntradaSaida = dataSaida - dataEntrada
        let difEntradaSaidaHora = Math.floor((difEntradaSaida) % 86400000 / 3600000)
        let difEntradaSaidaMin = Math.round(((difEntradaSaida % 86400000) % 3600000) / 60000)

        // calculando tempo de intervalo
        let dataSaidaAlmoco = new Date(2020, 11, 11, saidaAlmocoHora, saidaAlmocoMin, 0, 0)
        let dataRetornoAlmoco = new Date(2020, 11, 11, retornoAlmocoHora, retornoAlmocoMin, 0, 0)
        let difAlmoco = dataRetornoAlmoco - dataSaidaAlmoco
        let difAlmocoHora = Math.floor((difAlmoco) % 86400000 / 3600000)
        let difAlmocoMin = Math.round(((difAlmoco % 86400000) % 3600000) / 60000)

        // quanto tempo foi trabalhado no dia descontando do intervalo
        let dataEntradaSaida = new Date(2020, 11, 11, difEntradaSaidaHora, difEntradaSaidaMin, 0, 0)
        let dataIntervalo = new Date(2020, 11, 11, difAlmocoHora, difAlmocoMin, 0, 0)
        let difEntradaSaidaIntervalo = dataEntradaSaida - dataIntervalo
        let difEntradaSaidaIntervaloHora = Math.floor((difEntradaSaidaIntervalo) % 86400000 / 3600000)
        let difEntradaSaidaIntervaloMin = Math.round(((difEntradaSaidaIntervalo % 86400000) % 3600000) / 60000)

        // saldo considerando obrigatoriedade de 8h
        let dataTrabalhada = new Date(2020, 11, 11, difEntradaSaidaIntervaloHora, difEntradaSaidaIntervaloMin, 0, 0)
        let dataMinima = new Date(2020, 11, 11, 8, 0, 0, 0)
        let difMinimaTrabalhada = 0
        if (dataTrabalhada > dataMinima) {
            difMinimaTrabalhada = dataTrabalhada - dataMinima
        } else if (dataMinima > dataTrabalhada) {
            difMinimaTrabalhada = dataMinima - dataTrabalhada
            saldoSinal = '-'
        } else {
            saldoSinal = ''
        }
        let saldoHora = Math.floor((difMinimaTrabalhada) % 86400000 / 3600000)
        let saldoMin = Math.round(((difMinimaTrabalhada % 86400000) % 3600000) / 60000)

        saldoHora = saldoHora === 0 ? '00' : saldoHora;

        if (saldoMin === 0) {
            saldoMin = '00';
        } else if (saldoMin < 10) {
            saldoMin = '0' + saldoMin;
        }

        return (saldoSinal + saldoHora + ':' + saldoMin);
    }

    criarNomeTabela = (dataAtual) => {
        //Registros 2020/Agosto/Dia 12
        let ano = dataAtual.getFullYear();
        let dia = dataAtual.getDate();
        dia = dia < 10 ? '0' + dia : dia;
        let meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        let mesAtual = meses[dataAtual.getMonth()];
        return 'Registros ' + ano + '/' + mesAtual + '/Dia ' + dia;
    }

}

const styles = StyleSheet.create({
    global: {
        flex: 1
    },
    loader: {
        justifyContent: 'center',
        flex: 0.8
    },
    container: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center'
    },
    btnRegistroTexto: {
        paddingTop: 20,
        fontSize: 20
    },
    containerRegistro: {
        flex: 0.1,
    },
    registro: {
        flexDirection: 'row',
        paddingTop: 20,
    },
    registroInfo: {
        paddingRight: 10,
        fontSize: 20
    },
    registroInfoDesabilitado: {
        color: 'gray',
        fontSize: 20
    },
    containerBtnRegistro: {
        flex: 0.4,
        marginTop: 20,
    },
    msgSucesso: {
        paddingTop: 30,
        color: 'green',
        fontSize: 20,
    },
    msgErro: {
        paddingTop: 2,
        color: 'red',
        fontSize: 20
    },
    btnRegistrar: {
        flex: 0.4,
        marginTop: 20,
    },
    btnGerenciamento: {
        bottom: 0,
        position: 'absolute',
        width: '100%'
    }
});

export default Registro;