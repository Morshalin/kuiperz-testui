import { useRouter } from 'next/router';
import React, { useEffect,useState } from 'react';
import axios from "axios";
import '../../../app/bootstrap.css';

function accountEdit() {
    const router = useRouter();
    const [accountTypes, setAccountType] = useState([]);
    const [branch, setBranch] = useState([]);
    

  const [account, setAccount] = useState({
    account_type_id: "",
    branche_id: "",
    account_number:"",
    balance: "",
    status : "",
  });

    useEffect(() => {
	    loadAccount();
	}, [router.query.id]);

    useEffect(() => {
	    accountType();
        branche();
	}, []);

    const accountType = async () => {
        let response = await axios
        .get(`${process.env.api_url}/account-type`)
        .then((accountTypeData) => {
            setAccountType(accountTypeData.data.data.data);
        })
        .catch((error) => {
            return error
        })
    }

    const branche = async () => {
        let response = await axios
        .get(`${process.env.api_url}/branch`)
        .then((branchData) => {
            setBranch(branchData.data.data.data);
        })
        .catch((error) => {
            return error
        })
    }

    const loadAccount = async () => {
        if(router.query.id !== undefined){
            let response = await axios
            .get(`${process.env.api_url}/account/${router.query.id}`)
            .then((accountData) => {
                setAccount({
                    ...account,
                    account_type_id: accountData.data.data?.account_type.id,
                    branche_id: accountData.data.data?.branche.id,
                    account_number:accountData.data.data?.account_number,
                    balance: accountData.data.data?.balance,
                    status : accountData.data.data?.status,
                });
                //console.log("check",accountData.data.data);
            })
            .catch((error) => {
                return error
            })
        }
		
	}

    // saving data on state
  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setAccount({ ...account, [name]: value });
  };

  //submit data 
  const submitBrandData = async(event)=>{
    event.preventDefault();

    const accountFormData = new FormData();
    account.account_type_id && accountFormData.append("account_type_id", account.account_type_id);
    account.branche_id && accountFormData.append("branche_id", account.branche_id);
    account.account_number && accountFormData.append("account_number", account.account_number);
    account.balance && accountFormData.append("balance", account.balance);
    account.status && accountFormData.append("status", account.status);
    accountFormData.append("_method", "PUT");

    const accountApiUrl = `${process.env.api_url}/account/${router.query.id}`;

    await axios
        .post(accountApiUrl, accountFormData, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then((apiResponses) => {
            console.log(apiResponses);
            alert(apiResponses.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  //console.log(account);

    return ( 
        <div className="row m-5">
          <div className="col-sm-8 offset-2">
            <div className="card" >
              <div className="card-header">
                <span>Account Edit  <a className="ml-2" href="/account/accountlist"> Account List</a></span>
              </div>
              <div className="card-body">
                <form>
                    <div className="mb-3">
                    <label for="account_type_id" className="form-label">Account Type</label>
                        <select className="form-select" aria-label="Default select example" name='account_type_id' id='account_type_id' value={account.account_type_id} onChange={handleChange}>
                            {accountTypes && accountTypes.map((accountType)=> (
                                <option value={accountType.id}>{accountType.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                    <label for="branche_id" className="form-label">Branche</label>
                        <select className="form-select" aria-label="Default select example" name='branche_id' id='branche_id' value={account.branche_id} onChange={handleChange}>
                            {branch && branch.map((branch)=> (
                                <option value={branch.id}>{branch.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label for="account_number" className="form-label">Account Number</label>
                        <input type="text" value={account.account_number} onChange={handleChange} className="form-control" id="account_number" name="account_number" />
                    </div>

                    <div className="mb-3">
                        <label for="balance" className="form-label">Balance</label>
                        <input type="text" value={account.balance} onChange={handleChange} className="form-control" name="balance" id="balance" /> 
                    </div>
                    
                    <div className="mb-3">
                    <label for="status" className="form-label">Branche</label>
                        <select className="form-select" aria-label="Default select example" name='status' id='status' value={account.status} onChange={handleChange}>
                            <option value="pending">pending</option>
                            <option value="no-deposit">no deposit</option>
                            <option value="no-withdrawal">no withdrawal</option>
                            <option value="restricted">restricted</option>
                            <option value="frozen">frozen</option>
                            <option value="inactive">inactive</option>
                            <option value="active">active</option>
                        </select>
                    </div>

                    
                    <button type="submit" 
                    className="btn btn-primary"
                    onClick={submitBrandData}
                    >Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
     );
}

export default accountEdit;