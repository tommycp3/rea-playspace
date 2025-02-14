import React, { useEffect, useState } from "react";
import { SlButton, SlCard, SlInput, SlTextarea } from "@shoelace-style/shoelace/dist/react";
import { Link, useParams } from "react-router-dom";
import MainPanelHeader from "../MainPanelHeader";
import { Agent } from "../../../data/models/Valueflows/Knowledge";
import { useNavigate } from "react-router-dom";
import getDataStore from "../../../data/DataStore";
import { ListProfiles, MyProfile } from "../../../elements";
import { AgentShape } from "../../../types/valueflows";

export type NewAgentProps = {
}

const initialState = {
  name: '',
  image: '',
  primaryLocation: '',
  note: ''
}

const AgentView: React.FC<NewAgentProps> = () => {
  const [
    {name, image, primaryLocation, note}, setState
  ] = useState(initialState);

  const store = getDataStore();
  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    if (id) {
      const obj = store.getById(id);
      setState({
        name: obj.name ? obj.name : '',
        image: obj.image ? obj.image : '',
        primaryLocation: obj.primaryLocation ? obj.primaryLocation : '',
        note: obj.note ? obj.note : '',
      })
    };
  }, []);

  const clearState = () => {
    setState({ ...initialState });
  };

  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  /**
   * TODO: ListProfiles is causing the UI to freeze and crash.
   *
   */
  // const handleAddAgentFromProfile = async (e: CustomEvent) => {
  //   clearState();
  //   navigate('/');
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const store = getDataStore();

    const ag: Agent =  new Agent({name, image, primaryLocation, note});

    if (id) {
      ag.id = id;
      store.upsert<AgentShape, Agent>(ag, Agent);
    } else {
      store.set(ag);
    }
    clearState();
    navigate('/agents');
  }

  return (
    <>
      <MainPanelHeader>
        <h2>New Agent</h2>
        <Link to="/agents">
          <SlButton variant="warning">Cancel</SlButton>
        </Link>
      </MainPanelHeader>
      <section style={{"display": "flex"}}>
        <SlCard className="agent-view-card scrollable-view">
        <form onSubmit={handleSubmit}>
          <br />
          <br />
          <SlInput
            required
            label="Name"
            name="name"
            // @ts-ignore
            onSlInput={onChange}
            value={name}

          />
          <br />
          <SlInput
            required
            label="Image"
            name="image"
            // @ts-ignore
            onSlInput={onChange}
            value={image}

          />
          <br />
          <SlTextarea
            label='Note'
            name='note'
            // @ts-ignore
            onSlInput={onChange}
            value={note}
          />
          <br />
          <SlInput
            required
            label="Primary Location"
            name="primaryLocation"
            // @ts-ignore
            onSlInput={onChange}
            value={primaryLocation}
          />
          <br />
          <SlButton type="submit" variant="primary">
            {id ? 'Update' : 'Create'}
          </SlButton>
        </form>
        </SlCard>
      
        {/* <SlCard className="new-agent-card">
          <ListProfiles
              onagentselected={(e:CustomEvent) => handleAddAgentFromProfile(e)}>
          </ListProfiles>
          <p>Placeholder for AgentList</p>
          <form onSubmit={handleSubmit}>
          </form>
        </SlCard> */}
      </section>
    </>
  );
};

export default AgentView;


