
import { forwardRef, ReactNode, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Center, createStyles, Group, Loader, Modal, Select, TextInput, Text, Button } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useMutation, useQuery } from '@apollo/client';

import { mutations, queries } from '../../api/api';
import Spacer from '../Spacer';

const useStyles = createStyles({});

export interface AddTaskModalProps {
  actionElement: (_open: () => void) => ReactNode,
  projectID?: string,
}

export default function AddTaskModal({ actionElement, projectID } : AddTaskModalProps) {
  let {} = useStyles();
  let [ addTask, {} ] = useMutation(mutations.ADD_TASK);
  let { loading, error, data: projectsData } = useQuery(queries.GET_PROJECTS);
  let [ opened, { open, close } ] = useDisclosure(false);
  let [ taskTitle, setTaskTitle ] = useState('');
  let [ taskDescription, setTaskDescription ] = useState('');
  let [ taskDue, setTaskDue ] = useState<Date | null>(null);
  let [ taskProjectID, setTaskProjectID ] = useState<string | null>(null);

  const onSubmit = async () => {
    if (!taskDue) return;
    let projID = projectID ? projectID : taskProjectID;
    if (!projID) return;

    await addTask({
      variables: {
        inp: {
          title: taskTitle,
          description: taskDescription,
          due: taskDue.getTime(),
          project: projID,
        },
      },
    });
    setTaskTitle('');
    setTaskDescription('');
    setTaskDue(null);
    setTaskProjectID(null);
    close();
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Task">
        {
          (!loading && !error) ?
            <>
              <Spacer height={15} />
              <TextInput label="Title" placeholder="My new task" value={taskTitle} onChange={event => {
                event.preventDefault();
                setTaskTitle(event.target.value);
              }} />
              <Spacer height={10} />
              <TextInput label="Description" placeholder="Lorem ipsum...." value={taskDescription} onChange={event => {
                event.preventDefault();
                setTaskDescription(event.target.value);
              }} />
              <Spacer height={10} />
              <DatePickerInput
                dropdownType='modal'
                label="Due Date"
                placeholder="When's the task due?"
                value={taskDue}
                onChange={val => setTaskDue(val)}
              />
              {
                projectID === undefined ?
                  <>
                    <Spacer height={10} />
                    <Select
                      itemComponent={SelectItem}
                      label='Project'
                      data={projectsData.projects.map((project: any) => ({
                        label: project.title,
                        description: project.description,
                        value: project.id,
                      }))}
                      value={taskProjectID}
                      onChange={val => setTaskProjectID(val)}
                    />
                  </> : <></>
              }
              <Spacer height={25} />
              <Button style={{ width: '100%' }} onClick={onSubmit}>Add</Button>
            </> : <Center style={{ height: '300px' }}><Loader /></Center>
        }
      </Modal>

      {actionElement(open)}
    </>
  );
}

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string
  description: string
  value: string
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);