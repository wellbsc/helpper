import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'
import './UserCrud.css'
import MaskedInput from 'react-text-mask'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Exluir!'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: { name: '', email: '', telefone: '', celular: '', cep: '', logradouro: '', numero: '', bairro: '', cidade: '', estado: '' },
    list: []
}


export default class UserCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ USER: initialState.user })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialState.user, list })
            })
    }

    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if (add) list.unshift(user)
        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                vlaue={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                vlaue={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Telefone</label>
                            <MaskedInput mask={['(', /[1-9]/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                type="tel"
                                className="form-control"
                                name="telefone"
                                vlaue={this.state.user.telefone}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o Telefone"
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Celular</label>
                            <MaskedInput mask={['(', /[1-9]/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                type="tel"
                                className="form-control"
                                name="celular"
                                vlaue={this.state.user.celular}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o Celular"
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>CEP</label>
                            <MaskedInput mask={[/[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                                type="text"
                                className="form-control"
                                name="cep"
                                vlaue={this.state.user.cep}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o CEP"
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Logradouro</label>
                            <input
                                type="text"
                                className="form-control"
                                name="logradouro"
                                vlaue={this.state.user.logradouro}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o Logradouro" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Número</label>
                            <input
                                type="text"
                                className="form-control"
                                name="numero"
                                vlaue={this.state.user.numero}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o Número" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Bairro</label>
                            <input
                                type="text"
                                className="form-control"
                                name="bairro"
                                vlaue={this.state.user.bairro}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o Bairro" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Cidade</label>
                            <input
                                type="text"
                                className="form-control"
                                name="cidade"
                                vlaue={this.state.user.cidade}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o Cidade" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Estado</label>
                            <input
                                type="text"
                                className="form-control"
                                name="estado"
                                vlaue={this.state.user.estado}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a UF do Estado"
                                maxlength="2" />
                        </div>
                    </div>

                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                      </button>
                        <button className="btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                      </button>
                    </div>
                </div>
            </div>

        )
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    renderTabble() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Celular</th>
                        <th>CEP</th>
                        <th>Logradouro</th>
                        <th>Número</th>
                        <th>Bairro</th>
                        <th>Cidade</th>
                        <th>UF</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.telefone}</td>
                    <td>{user.celular}</td>
                    <td>{user.cep}</td>
                    <td>{user.logradouro}</td>
                    <td>{user.numero}</td>
                    <td>{user.bairro}</td>
                    <td>{user.cidade}</td>
                    <td>{user.estado}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button></td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTabble()}
            </Main>
        )
    }
}