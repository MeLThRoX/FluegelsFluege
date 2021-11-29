import React, { Component } from "react";
import format from "date-fns/format";
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";

import "./Wrapper.css"
import './table.css'

import MODCKDATA from './test-data.json'
import BasicTableSelectFlight from "./basicTableSelectFlight";

import BookingOverview from "./flightBooking";

const filterPassedTime = (time) => {
  const currentDate = new Date();
  const selectedDate = new Date(time);

  return currentDate.getTime() < selectedDate.getTime();
};

class FlightOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      numbers: [],
      origin: "",
      destination: "",
      time: new Date(),
      anzahlReisende: 1,
      flights: []
    };

    this.handleChangePassenger = this.handleChangePassenger.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeDest = this.handleChangeDest.bind(this);
    this.handleBooking = this.handleBooking.bind(this);

  }

  handleChange = (anzahlReisende) => {
    this.setState({ anzahlReisende });
  };

  handleChangePassenger(event) {    
    this.setState({anzahlReisende: event.target.value}) 
  }

  handleChangeStart(event) {    
    this.setState({origin: event.target.value});  
  }

  handleChangeDest(event) {    
    this.setState({destination: event.target.value});  
  }
  
  handleChangeStartDate(date) {
    this.setState({time: date})
    /*this.setState({timeToSubmit: format(date, "yyyy-M-d'T'hh:mm:ss'Z'") });*/
  }

  async handleBooking(e, newID) {
    
    this.props.setFlightID(newID)
    this.props.setPassengerCount(this.state.anzahlReisende)
    this.props.setPage(e, BookingOverview)

  }

  async handleSubmit() {
    /*
    const selectedData = {
      "origin": this.state.origin,
      "destination": this.state.destination
     
    }
    // "time": format(this.state.time,"yyyy-M-d'T'hh:mm:ss'Z'")
*/
    const seletedData =  {
      "origin": "IST",
      "destination": "FRA"
    }
    
    const response = await fetch('/api/flights/search', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'charset':'utf-8'},
      body: JSON.stringify(seletedData)
    })

    const data = await response.json()

    if (response.ok) {
      this.setState({flights: [data]})
    } else {
      alert("Error: " + response.status)
    }
  }

  componentDidMount() {
    this.setState({ 
      countries: [
        {id: 'IST', name: 'IST'},
        {id: 'FRA', name: 'FRA'},
        {id: 'ALB', name: 'Albania'}
      ],
      numbers: [ 
        {label: "1", value: 1},
        {label: "2", value: 2},
        {label: "3", value: 3},
        {label: "4", value: 4},
        {label: "5", value: 5},
        {label: "6", value: 6},
        {label: "7", value: 7},
        {label: "8", value: 8}
      ] 
    });
  }

  render () {

    const { countries } = this.state;

    const { numbers } = this.state;

    let numbersList = numbers.map((item, i) => {
      return (
        <option key={i} value={item.label}>{item.value}</option>
      )
    }, this);

    let countriesList = countries.length > 0
    	&& countries.map((item, i) => {
      return (
        <option key={i} value={item.id}>{item.name}</option>
      )
    }, this);

    return (
      <div style={{textAlign: "center"}}>
        <div>
          <div>
            Wo wollen Sie starten:
            <select value={this.state.origin} onChange={this.handleChangeStart}>
              {countriesList}
            </select>
          </div>
          <div>
            Wo wollen Sie landen:
            <select value={this.state.destination} onChange={this.handleChangeDest}>
              {countriesList}
            </select>
          </div>
          <div>
            Anzahl an Reisenden:
          </div>
          <div>
            <select value={this.state.anzahlReisende} onChange={this.handleChangePassenger}>
              {numbersList}
            </select>
          </div>
          <div>
            Wann wollen soll der Flug starten:
          </div>
          <div> 

            <DatePicker
                selected={this.state.time}
                onChange={(date) => this.handleChangeStartDate(date)}
                showTimeSelect
                timeFormat="hh:mm aa"
                timeIntervals={20}
                timeCaption="time"
                dateFormat="yyyy-M-d hh:mm aa"
                minDate={new Date()}
                filterTime={filterPassedTime}
            />

          </div>
        </div>
        
        <div>
          <p>Ausgewählter Start: {this.state.origin}</p>
          <p>Ausgewähltes Ziel: {this.state.destination}</p>
          <p>Anzahl Passagiere: {this.state.anzahlReisende}</p>
          <p>Ausgewähltes Datum: {format(this.state.time, "yyyy-M-d'T'hh:mm:ss'Z'")}</p>
        </div>
      <button onClick={() => this.handleSubmit()}>Nach Flug suchen</button> 
      <div style={{margin: 15}}>
        <BasicTableSelectFlight data={MODCKDATA} setFlightID={this.handleBooking}/>
      </div>
    </div>
    );
  }
}

export default FlightOverview;

/*
<BasicTable setFlightID={this.setIdToBook} columsLayout={ColumnsFlight} dataToDisplay={MOCKDATA}/>


const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

function BasicTable(toDisplay) {

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() =>MOCK_DATA, []);
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows
  } = useTable(
    {
      columns,
      data
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: () => <div />,
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => {
            if (
              rows.filter((row) => row.isSelected).length < 1 ||
              row.isSelected
            ) {
              return (
                <div>
                  <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                </div>
              );
            } else {
              return (
                <div>
                  <IndeterminateCheckbox
                    checked={false}
                    readOnly
                    style={row.getToggleRowSelectedProps().style}
                  />
                </div>
              );
            }
          }
        },
        ...columns
      ]);
    }
  );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th> 
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
      <pre>
        <code>
          {JSON.stringify(
            {
              'selectedFlatRows[].original': selectedFlatRows.map(
                d => d.original._id
              ),
            },
            null,
            2
          )}
        </code>
      </pre>
    </table>
  )
}
*/