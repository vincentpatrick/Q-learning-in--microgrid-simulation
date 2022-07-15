
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

