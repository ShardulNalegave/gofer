
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createStyles, Text, Center, Loader, Title, Tabs, Paper, Checkbox, Grid, Button, ActionIcon } from '@mantine/core';
import { useMutation, useQuery } from '@apollo/client';

import { Right } from '../rights';
import { mutations, queries } from '../api/api';
import { useLoggedInUserData } from '../contexts/loggedInUserData';
import Page from '../components/Page';
import Spacer from '../components/Spacer';
import { IconChecklist, IconEdit, IconTrash, IconUsers } from '@tabler/icons-react';
import moment from 'moment';
import AddTaskModal from '../components/modals/AddTaskModal';

const useStyles = createStyles({});

export default function Project() {
  let {} = useStyles();
  let params = useParams();
  let { loading, error, data } = useQuery(queries.GET_PROJECT, {
    pollInterval: 1000,
    variables: { id: params.id },
  });
  let [ updateTask, {} ] = useMutation(mutations.UPDATE_TASK);
  let { rights } = useLoggedInUserData();

  let [ showCompleted, setShowCompleted ] = useState(false);

  return (
    (!loading && !error) ?
      <Page padding={ 0 } scroll={true}>
        <div style={{ padding: '30px' }}>
          <Spacer height={20} />
          <Title>{data.project.title}</Title>
          <Spacer height={10} />
          <Text>{data.project.description}</Text>
          <Spacer height={15} />
          {
            rights.includes(Right.PROJECTS_UPDATE) ?
              <Button size='xs' leftIcon={<IconEdit />}>Edit</Button> : <></>
          }
        </div>
        <Tabs defaultValue="tasks">
          <Tabs.List defaultValue="tasks">
            <Tabs.Tab value="tasks" icon={<IconChecklist size="0.8rem" />}>Tasks</Tabs.Tab>
            <Tabs.Tab value="users" icon={<IconUsers size="0.8rem" />}>Users</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="tasks" style={{ padding: '30px' }}>
            <Grid gutter={0} align='center'>
              <Grid.Col span='content'>
                {
                  rights.includes(Right.TASKS_CREATE) ?
                    <AddTaskModal actionElement={open => <Button onClick={open}>Add Task</Button>} projectID={data.project.id} />
                    : <></>
                }
              </Grid.Col>
              <Grid.Col span='auto'></Grid.Col>
              <Grid.Col span='content' style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                <Checkbox label="Show completed" checked={showCompleted} onChange={() => setShowCompleted(!showCompleted)}/>
              </Grid.Col>
            </Grid>
            <Spacer height={20} />
            {data.project.tasks
            .filter((task: any) => {
              let res = true;
              if (task.completed && !showCompleted) res = false;
              return res;
            }).sort((a: any, b: any) => {
              return b.due - a.due;
            }).map((task: any) => {
              return (
                <Paper style={{ marginTop: '5px', marginBottom: '5px', padding: '15px' }} withBorder key={task.id}>
                  <Grid gutter={0}>
                    <Grid.Col span='auto'>
                      <Checkbox label={task.title} checked={task.completed} onChange={() => {
                        updateTask({
                          variables: {
                            updt: {
                              id: task.id,
                              completed: !task.completed,
                            }
                          },
                        });
                      }} disabled={!rights.includes(Right.TASKS_UPDATE)} />
                      <Spacer height={10} />
                      <Text color='dimmed'>{task.description}</Text>
                    </Grid.Col>
                    <Grid.Col span='content' style={{ paddingLeft: '10px' }}>
                      <Text color='dimmed'>{moment(task.due).format("MMMM Do YYYY")}</Text>
                    </Grid.Col>
                    <Grid.Col span='content' style={{ paddingLeft: '20px' }}>
                      <ActionIcon color='dimmed' style={{ display: 'inline-block' }}><IconEdit /></ActionIcon>
                      <Spacer width={5} span />
                      <ActionIcon color='red' style={{ display: 'inline-block' }}><IconTrash /></ActionIcon>
                    </Grid.Col>
                  </Grid>
                </Paper>
              );
            })}
          </Tabs.Panel>

          <Tabs.Panel value="users" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
            <h1>Users</h1>
          </Tabs.Panel>
        </Tabs>
      </Page>
      :
      <Page scroll={false} padding={0}>
        <Center style={{ height: '100vh' }}>
          <Loader />
        </Center>
      </Page>
  );
}
