import React, { useState } from 'react';
import styled from 'styled-components';
import { VscDiffAdded } from 'react-icons/vsc';
import { BsFillTrashFill } from 'react-icons/bs';
import { Cookies } from 'react-cookie';
import axios from 'axios';


/* STYLE */
import './style.scss';

/* COMPONENTS */
import NewItemForm from '../NewItemForm';
import NewWeaponForm from '../NewWeaponForm';
const InventoryContainer = styled.div`
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 20vh auto auto;
    grid-template-areas:
        "basic"
        "items"
        "weapons";
`;

function Inventory({
    charName,
    inventoryState,
    setInventoryState,
    setRolling,
    setRollConfigs
}) {
    const [ showNewItem, setShowNewItem ] = useState(false);
    const [ showNewWeapon, setShowNewWeapon ] = useState(false);

    const delItem = (itemId) => {
        const token = new Cookies().get('token');
        axios.delete(`${process.env.REACT_APP_API_URL}/inventory/item?itemId=${itemId}`, {
            headers: {
                authorization: `JOJO ${token}`
            },
        }).then(resp => setInventoryState(resp.data)).catch(err => { if (err) console.log(err) })
    }

    const handleWeaponType = type => {
        const weaponTypes = {
            custom: 'Personalizado',
            machineGun: 'Metralhadora',
            pistol: 'Pistolas',
            shotgun: 'Shotguns',
            rifle: 'Rifles',
            sniper: 'Snipers',
            grenade: 'Granada',
            body: 'Arma Branca',
        }
        return weaponTypes[type];
    }

    return <InventoryContainer>
        <div id="basic-area">
            <h1 id="name">{charName}</h1>
        </div>
        <div id='items-area'>
            <h2>Itens</h2>
            <table className='items-table'>
                <thead>
                    <tr><th>Nome</th><th>Detalhe</th><th>Quantidade</th><th>Deletar</th></tr>
                </thead>
                <tbody>
                    {React.Children.toArray(inventoryState.items?.map(
                        item => <tr>
                            <td>{item.name}</td>
                            <td>{item.details}</td>
                            <td>{item.quantity}</td>
                            <td className='del-container'><BsFillTrashFill onClick={() => delItem(item._id)} /></td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td><VscDiffAdded className='add-item' onClick={() => setShowNewItem(true)}/></td>
                    </tr>
                </tfoot>
            </table>
            { showNewItem && <NewItemForm setShowNewItem={setShowNewItem} setInventoryState={setInventoryState}/> }
        </div>
        <div id='weapons-area'>
            <h2>Armas</h2>
            <table className='items-table'>
                <thead>
                    <tr>
                        <th>ARMA</th>
                        <th>TIPO</th>
                        <th>DANO</th>
                        <th>CRÍTICO</th>
                        <th>ALCANCE</th>
                        <th>QUANTIDADE</th>
                    </tr>
                </thead>
                <tbody>
                    {React.Children.toArray(inventoryState.items?.map(
                        item => item.weapon && <tr>
                            <td>{item.name}</td>
                            <td>{handleWeaponType(item.tipo)}</td>
                            <td className='damage-weapon' onClick={() => {
                                const [ times, faces ] = item.damage.split('D')
                                setRolling(true)
                                setRollConfigs({
                                    times: Number(times),
                                    faces: Number(faces),
                                })
                            }}>{item.damage}</td>
                            <td>{item.critic}</td>
                            <td>{item.range}</td>
                            <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr><td><VscDiffAdded className='add-item' onClick={() => setShowNewWeapon(true)}/></td></tr>
                </tfoot>
            </table>
            { showNewWeapon && <NewWeaponForm
                setInventoryState={setInventoryState}
                setShowNewWeapon={setShowNewWeapon}
            /> }
        </div>
    </InventoryContainer>;
}

export default Inventory;