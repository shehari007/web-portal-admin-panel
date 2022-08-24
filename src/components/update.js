import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useHistory } from 'react-router';

export default function Update() {

    let history = useHistory();
    const [isletme_id, setID] = useState('');
    const [isletme_adi, setIsletmeAdi] = useState('');
    const [isletme_adres, setIsletmeAdres] = useState('');
    const [isletme_sabit_tel, setTelefon] = useState('');
    const [isletim_web_adresi, setWebadresi] = useState('');
    const [kategori, setKategori] = useState('');
    const [calisma_saatler, setCalismaSaatler] = useState('');
    const [og_indirim, setOgIndirim] = useState('');
    const [harita_adresi, setHaritaAdresi] = useState('');
    const [harita_embed, setHaritaEmbed] = useState('');
    const [resmi_website, setResmiWebsite] = useState('');
    const [hak_adresi, setHakAdresi] = useState('');

    useEffect(() => {
        setID(localStorage.getItem('isletme_id'))
        setIsletmeAdi(localStorage.getItem('isletme_adi'));
        setIsletmeAdres(localStorage.getItem('isletme_adres'));
        setTelefon(localStorage.getItem('isletme_sabit_tel'));
        setWebadresi(localStorage.getItem('isletim_web_adresi'));
        setKategori(localStorage.getItem('kategori'));
        setCalismaSaatler(localStorage.getItem('calisma_saatler'));
        setOgIndirim(localStorage.getItem('og_indirim'));
        setHaritaAdresi(localStorage.getItem('harita_adresi'));
        setHaritaEmbed(localStorage.getItem('harita_embed'));
        setResmiWebsite(localStorage.getItem('resmi_website'));
        setHakAdresi(localStorage.getItem('hak_adresi'));
    }, []);



    const updateAPIData = () => {
        var adi = document.getElementById('adi').value;
        var adres = document.getElementById('adres').value;
        var id = document.getElementById('id').value;
        var tel = document.getElementById('tel').value;
        var web = document.getElementById('webadres').value;
        var kat = document.getElementById('kategori').value;
        var cs = document.getElementById('cs').value;
        var og = document.getElementById('ogindirim').value;
        var hadres = document.getElementById('haradres').value;
        var hembed = document.getElementById('harembed').value;
        var resweb = document.getElementById('resmilink').value;
        var hak = document.getElementById('hakadres').value;

        const FormData = require('form-data');
        let data = new FormData();
        data.append('action', 'update');
        data.append('isletme_adi', adi);
        data.append('isletme_adres', adres);
        data.append('isletme_id', id);
        data.append('isletim_web_adresi', web);
        data.append('isletme_sabit_tel', tel);
        data.append('kategori', kat);
        data.append('calisma_saatler',cs);
        data.append('og_indirim', og);
        data.append('harita_adresi',hadres);
        data.append('harita_embed',hembed);
        data.append('resmi_website',resweb);
        data.append('hak_adresi',hak);

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
               
            })
    }
    return (
        <div>
            <Form className="create-form">
            <Form.Field>
                    <label>Isletme_ID</label>
                    <input id="id" value={isletme_id} onChange={(e) => setID(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Isletme_Adi</label>
                    <input id="adi" value={isletme_adi} onChange={(e) => setIsletmeAdi(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Isletme_Adres</label>
                    <input id="adres" value={isletme_adres} onChange={(e) => setIsletmeAdres(e.target.value)} />
                </Form.Field>
                
                <Form.Field>
                    <label>Isletme Telefon</label>
                    <input id="tel" value={isletme_sabit_tel} onChange={(e) => setTelefon(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Isletim WEB ADRESI</label>
                    <input id="webadres" value={isletim_web_adresi} onChange={(e) => setWebadresi(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Kategori</label>
                    <input id="kategori" value={kategori} onChange={(e) => setKategori(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>CALISMA SAATLER</label>
                    <input id="cs" value={calisma_saatler} onChange={(e) => setCalismaSaatler(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>INDIRIM OGRENCI</label>
                    <input id="ogindirim" value={og_indirim} onChange={(e) => setOgIndirim(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>HARITA ADRESI</label>
                    <input id="haradres" value={harita_adresi} onChange={(e) => setHaritaAdresi(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>HARITA EMBED LINK</label>
                    <input id="harembed" value={harita_embed} onChange={(e) => setHaritaEmbed(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>RESMI WEBSITE LINK</label>
                    <input id="resmilink" value={resmi_website} onChange={(e) => setResmiWebsite(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>HAKKINDA ADRESS</label>
                    <input id="hakadres" value={hak_adresi} onChange={(e) => setHakAdresi(e.target.value)} />
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Update</Button>
            </Form>
        </div>
    )
}
