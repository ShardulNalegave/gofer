
import { ReactNode, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { createStyles, Modal, TextInput, Button } from '@mantine/core';
import { useMutation } from '@apollo/client';

import { mutations } from '../../api/api';
import Spacer from '../Spacer';

const useStyles = createStyles({});

export interface AddProjectModalProps {
  actionElement: (_open: () => void) => ReactNode,
}

export default function AddProjectModal({ actionElement } : AddProjectModalProps) {
  let {} = useStyles();
  let [ addProject, {} ] = useMutation(mutations.ADD_PROJECT);
  let [ opened, { open, close } ] = useDisclosure(false);
  let [ projectTitle, setProjectTitle ] = useState('');
  let [ projectDescription, setProjectDescription ] = useState('');

  const onSubmit = async () => {
    await addProject({
      variables: {
        inp: {
          title: projectTitle,
          description: projectDescription,
        },
      },
    });
    setProjectTitle('');
    setProjectDescription('');
    close();
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Project">
        <Spacer height={15} />
        <TextInput label="Title" placeholder="My new project" value={projectTitle} onChange={event => {
          event.preventDefault();
          setProjectTitle(event.target.value);
        }} />
        <Spacer height={10} />
        <TextInput label="Description" placeholder="Lorem ipsum...." value={projectDescription} onChange={event => {
          event.preventDefault();
          setProjectDescription(event.target.value);
        }} />
        <Spacer height={25} />
        <Button style={{ width: '100%' }} onClick={onSubmit}>Add</Button>
      </Modal>

      {actionElement(open)}
    </>
  );
}
