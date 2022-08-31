import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import https from 'https'
import { useNavigate } from 'react-router-dom';

export default function Read() {
    let history = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        history('/login')
    }
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        const agent = new https.Agent({
            rejectUnauthorized: false
        });
        axios.get('http://localhost/testapi.php?action=list', { httpsAgent: agent })
            .then((response) => {
                console.log(response.data);
                setAPIData(response.data);
            })
    }, []);

    const setData = (data) => {
        let { isletme_id, isletme_adi, isletme_adres, isletme_sabit_tel, isletim_web_adresi, kategori, calisma_saatler, og_indirim
            , harita_adresi, harita_embed, resmi_website, hak_adresi } = data;
        localStorage.setItem('isletme_id', isletme_id);
        localStorage.setItem('isletme_adi', isletme_adi);
        localStorage.setItem('isletme_adres', isletme_adres);
        localStorage.setItem('isletme_sabit_tel', isletme_sabit_tel);
        localStorage.setItem('isletim_web_adresi', isletim_web_adresi);
        localStorage.setItem('kategori', kategori);
        localStorage.setItem('calisma_saatler', calisma_saatler);
        localStorage.setItem('og_indirim', og_indirim);
        localStorage.setItem('harita_adresi', harita_adresi);
        localStorage.setItem('harita_embed', harita_embed);
        localStorage.setItem('resmi_website', resmi_website);
        localStorage.setItem('hak_adresi', hak_adresi);
    }

    const getData = () => {
        axios.get(`http://localhost/testapi.php?action=list`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }

    const onDelete = (id) => {
        const FormData = require('form-data');
        let data = new FormData();
        data.append('action', 'delete');
        data.append('isletme_id', id);
        let config = {

            method: 'post',
            url: 'http://localhost/testapi.php',
            headers: data.getHeaders ? data.getHeaders() : { 'Content-Type': 'multipart/form-data' }
            ,
            data: data
        };

        axios(config).then(function (response) {
            console.log(JSON.stringify(response.data));
        })
            .catch(function (error) {
                console.log(error);
            }).then(() => {
                getData();
            })
    }

    return (

        <div>
            <br />
            <Button href='/create'>ADD NEW</Button>
            <Button onClick={handleLogout}>LOG OUT</Button>
            <br />
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                        <Table.HeaderCell>Isletme ID</Table.HeaderCell>
                        <Table.HeaderCell>ISLETME ADI</Table.HeaderCell>
                        <Table.HeaderCell>ISLETME ADRES</Table.HeaderCell>
                        <Table.HeaderCell>ISLETME SABIT TEL</Table.HeaderCell>
                        <Table.HeaderCell>ISLETME WEB ADRESI</Table.HeaderCell>
                        <Table.HeaderCell>ISLETME kategori</Table.HeaderCell>
                        <Table.HeaderCell>CALISMA SAATLER</Table.HeaderCell>
                        <Table.HeaderCell>OGRECI INDIRIMI</Table.HeaderCell>
                        <Table.HeaderCell>HARITA ADRESI</Table.HeaderCell>
                        <Table.HeaderCell>HARITA EMBED LINKI</Table.HeaderCell>
                        <Table.HeaderCell>RESMI WEBSITESI</Table.HeaderCell>
                        <Table.HeaderCell>HAKKINDA ADRESI</Table.HeaderCell>


                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row>
                                <Link to='/update'>
                                    <Table.Cell>
                                        <Button onClick={() => setData(data)}>Update</Button>
                                    </Table.Cell>
                                </Link>
                                <Table.Cell>
                                    <Button onClick={() => onDelete(data.isletme_id)}>Delete</Button>
                                </Table.Cell>
                                <Table.Cell>{data.isletme_id}</Table.Cell>
                                <Table.Cell>{data.isletme_adi}</Table.Cell>
                                <Table.Cell>{data.isletme_adres}</Table.Cell>
                                <Table.Cell>{data.isletme_sabit_tel}</Table.Cell>
                                <Table.Cell>{data.isletim_web_adresi}</Table.Cell>
                                <Table.Cell>{data.kategori}</Table.Cell>
                                <Table.Cell>{data.calisma_saatler}</Table.Cell>
                                <Table.Cell>{data.og_indirim}</Table.Cell>
                                <Table.Cell>{data.harita_adresi}</Table.Cell>
                                <Table.Cell>{data.harita_embed}</Table.Cell>
                                <Table.Cell>{data.resmi_website}</Table.Cell>
                                <Table.Cell>{data.hak_adresi}</Table.Cell>


                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}
