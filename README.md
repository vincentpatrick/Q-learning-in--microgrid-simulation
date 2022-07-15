
# Q-Learning Algorithm

In this project, I use Python to develop a microgrid simulation 
and build a deep Q-learning model to minimize 
operational cost of operating a microgrid

This project is inspired by Total-RD's Q-learning model: https://github.com/Total-RD/pymgrid







## Documentation

### 1. Simulating the Microgrid Environment for AI agent

#### Pymgrid

Pymgrid is a python microgrid Library used to simulate microgrids 
and it uses loaded datasets from DOE OpenEI and is based on TMY3 weather data and pv production datasets based on TMY3. 
This dataset is made of a year long time series with a one hour time-step with a total of 8760 points. 
The load and pv data are based from five cities from different climate zone in the US.
This dataset is what I'll be using for the AI agent to work with.

#### Microgrid Parameters
```python
    {'PV': 1, 'battery': 1, 'genset': 0, 'grid': 1}
```

After generating a microgrid, the microgrid architecture consisted of 
a solar PV generation, a battery and the main grid.

#### The control dictionary 
the control dictionary consist of the list of action that is 
available to be used in the microgrid simulation.
```python
['load', 'pv_consummed', 'pv_curtailed', 'pv', 'battery_charge',
 'battery_discharge', 'grid_import', 'grid_export']
 ```

 #### State Variable

States refers to the current situation that the agent is currently in,
inside the microgrid. In this environment, the state consist of the current net load
and the current battery capacity.



Net load is the amount of load in the system that the microgrid still needs to satisfy
to Calculate the net load, I use the formula

                                Net-load = Load - PV

#### Forecast for PV and Load of the Microgrid simulation
![Logo](https://github.com/vincentpatrick/Q-learning-in--microgrid-simulation/blob/main/forecast.jpg)


This is the forecast for load and pv generation for the next 24 hours

Based on both plot for the microgrid, it shows that in the next 24 hours,
The microgrid will only receive solar power from 7am in the morning to 4pm in the evening.
Microgrid 0 is able to satisfy the consumer load during those peak time.

## Agent Design

#### Action Space

In Q-learning, an agent has to select actions in different
states to maximize reward in an environment.[2] An action space 
is where we define all the actions that are available for the agent to make

Inside the control dictionary it shows the list of actions that can be taken. 
However in this training, we set the agent to only be able to take up to 5 actions defined at the full rate of the net load.
The actions that the agents can take are:
- Action 0: battery_charge
- Action 1: battery_discharge
- Action 2: grid_import
- Action 3: grid_export
I use selection to change the control dictionary based on the different action the agent take.
- If action 0 is selected, battery is charged.
- If action 1 is selected, battery is discharged. 
- If action 2 is selected, we import the current net load into the grid. 
- If action 3 is selected, we import the current net load into the grid. 
The function then returns the control dictionary for the run function.

## Q-tables
In a Q-table, it is stored with different states consisting of different net-load level 
from minimum to maximum and all battery state of charge level from min to max
The AI agent stores the action that the agent took on that state
This is how the agent will form its strategy and gets information on what is his best moves next.

## Exploration strategy
In an exploration/exploitation strategy, an agent doesn’t know in the beginning what is the best action to be taken for each state. 
Therefore, the algorithm needs to explore for a certain number of rounds. [3]

The method that we are using for exploration/exploitation is the epsilon-greedy action selection. 
An epsilon-greedy is used to balance the exploration and exploitation by choosing randomly between exploring and exploiting. 
The epsilon value refers to the probability of choosing to explore or to exploit.[4]

In this algorithm however, the epsilon value decreases as the exploration goes further. 
This leads the agent to have a very explorative behaviour in the beginning and becomes more highly exploitative as the training progresses. This is known as the greedy decreasing strategy.

## Training Q-learning

Now Training of the agent can be started.
We first initialize all the variables to be used
- Number of actions → 4
- Q →Q-table taking the action and microgrid name as a parameter
- Number of states → the total length of Q
- Number of episodes → 100
- Alpha → alpha is the learning rate of the algorithm, it is generally set between 0 and 1. If alpha is set to 0, it means that the Q value is never updated and therefore the agent learn nothing. The higher the value set to alpha, the faster the learning can occur. [5]
- Gamma → gamma is the discount factor. It is also generally set between 0 and 1. Discount factor indicates the notion that the current reward is more valuable then it is now in the future. If the value is near 0, then the future reward will not be taken into consideration but if it is near 1, it shows that the future reward will be great. [1]

Inside each episode, the training is being run for a number of simulation hours that we can declare.

In every hour (horizon),
1. The agent takes an action.
2. The action taken in the microgrid environment changes the status of the environment
3. The reward is subtracted by the cost of the action. The cost value is added to the total episode cost.
4. The state that the agent arrive in is based on the current net load and the state of charge of the agent
5. the agent then choose the action that leads to the best state in the table using max_dict function
6. Calculate the temporal difference error (td error). Temporal difference error indicates the difference between the agent’s current estimate and target value.
7. Then,Enter the new Q-table state.

After the horizon is finish and the episode is complete, decrease the epsilon and move forward to the next episode. 
This process Is repeated until it has finished through all the defined number of episodes. At the end of the process, the Q-table will be returned.
This Q-table becomes a list of experience that Ai agent has gone through during training and it will use this Q table for testing.

## Testing Q-learning

The agent is then tested in the microgrid simulation and will make decision based on the Q-table that it has built upon during training.


![Logo](https://github.com/vincentpatrick/Q-learning-in--microgrid-simulation/blob/main/result.jpg)