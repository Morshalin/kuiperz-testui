import { useRouter } from 'next/router';
import React, { useEffect,useState } from 'react';
import axios from "axios";
import '../../../app/bootstrap.css';

function accountView() {
    const router = useRouter();
    const [accountView, setAccountView] = useState([]);
    //const [accountId, setAccountID] = useState(router.query.id);
    //console.log(accountId);

    useEffect(() => {
	    loadAccount();
	}, [router.query.id]);

    const loadAccount = async () => {
		let response = await axios
        .get(`${process.env.api_url}/account/${router.query.id}`)
        .then((accountData) => {
            setAccountView(accountData.data.data)
            //console.log(accountData.data.data);
        })
        .catch((error) => {
            return error
        })
	}
    
    return ( 
        <div className="row m-5">
          <div className="col-sm-8 offset-2">
            <div className="card" >
              <div className="card-header">
                <span>Account View <a className="ml-2" href="/account/accountlist"> Account List</a></span>
              </div>
              <div className="card-body">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                        <th>Account Type</th>
                        <td>{accountView.account_type?.name}</td>
                    </tr>
                    <tr>
                        <th>Branche Name</th>
                        <td>{accountView.branche?.name}</td>
                    </tr>
                    <tr>
                        <th>Account Number</th>
                        <td>{accountView?.account_number}</td>
                    </tr>
                    <tr>
                        <th>Account Balance</th>
                        <td>
                            {
                                (accountView.balance ? parseFloat(accountView.balance) : 0).toFixed(2)
                            }
                        </td>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <td> {accountView.status}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
     );
}

export default accountView;