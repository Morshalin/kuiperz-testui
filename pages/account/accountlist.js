import React, { useEffect,useState } from 'react';
import axios from "axios";
import Link from 'next/link';
import '../../app/bootstrap.css';

function accountList() {
    const [accounts, setAccountsList] = useState([]);

    useEffect(() => {
	    loadAccount();
	}, []);

    const loadAccount = async () => {
		let response = await axios
        .get(`${process.env.api_url}/account`)
        .then((accountssData) => {
            setAccountsList(accountssData.data.data.data)
            console.log(accountssData.data.data.data);
        })
        .catch((error) => {
            return error
        })
	}
    const deletAccount = async(id) => {
        
        if(confirm('Are You Sure on to delete it?')){
            try {
                const accountDelete = new FormData();
                accountDelete.append("_method", "DELETE");

                const deleteApiUrl = await axios.post(
                  `${process.env.api_url}/account/${id}`,
                  accountDelete
                ).then((result) => {
                    console.log(result);
                    if(result.data.code == 200){
                        loadAccount();
                        alert(apiResponses.data.message);
                    }
                    
                })
              } catch (errors) {
                return errors;
              }
        }
    }

    return (
        <div className="row m-5">
          <div className="col-sm-8 offset-2">
            <div className="card" >
              <div className="card-header d-flex justify-content-between">
                <span>Account List <a href="/">Home</a></span>
                <span> 
                <Link className='btn btn-info btn-sm m-1' href={`add/add`}>
                    Create
                </Link> 
                </span>
              </div>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr className='text-center'>
                      <th scope="col">#</th>
                      <th scope="col">Account Type</th>
                      <th scope="col">Branche Name</th>
                      <th scope="col">Account Number</th>
                      <th scope="col">Balance</th>
                      <th scope="col">status</th>
                      <th>Acction</th>
                    </tr>
                  </thead>
                  <tbody>
                  {accounts && accounts.map((account, index) => (
                    <tr key={account.id} className='text-center'>
                        <th>{index+1}</th>
                        <td>{account.account_type.name}</td>
                        <td>{account.branche.name}</td>
                        <td>{account.account_number}</td>
                        <td>
                            {
                                (account.balance ? parseFloat(account.balance) : 0).toFixed(2)
                            }
                        </td>
                        <td>{account.status}</td>
                        <td>
                        <Link className='btn btn-info btn-sm m-1' href={`view/${account.id}`}>
                            View
                        </Link> 
  
                        <Link className='btn btn-success btn-sm m-1' href={`edit/${account.id}`}>
                            Edit
                        </Link> 

                        <button type='button' className='btn btn-danger btn-sm m-1' onClick={(event)=>{
                            event.preventDefault();
                            deletAccount(account.id);
                        }}>
                            Delete
                        </button>
                        </td>
                    </tr>
                  )
                  )}
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
}

export default accountList;