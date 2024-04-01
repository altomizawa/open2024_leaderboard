import { useState, useEffect } from "react";
import sortIcon from '../../assets/sort_FILL0_wght400_GRAD0_opsz24.svg'

import requestApi from "../../utils/api";

export default function IndividualLeaderboard() {
  const [currentLeaderboard, setCurrentLeaderboard] = useState([])
  const [ascendingNameOrder, setAscendingNameOrder] = useState(false);
  const [ascendingWodOne, setAscendingWodOne] = useState(false);
  const [ascendingWodTwo, setAscendingWodTwo] = useState(false);
  const [ascendingWodThree, setAscendingWodThree] = useState(false);
  const [ascendingTotal, setAscendingTotal] = useState(false);
  const [isTeamsSelected, setIsTeamsSelected] = useState(false)
  const [category, setCategory] = useState('RX')

      // REQUESTS FOR ALL FILTERS
  const filterRequest = async (options) => {
    const sortedRanking = await requestApi.getAllUsers(options)
    setCurrentLeaderboard(sortedRanking)
  }

  // HANDLE CATEGORY CHANGE
  const changeCategory = async () => {
    if(category === 'RX') {
      const options = {
        filter: {
          category: 'scaled',
        },
        sort: {
          finalRanking: 1,
        }
      }
      filterRequest(options);
      setCategory('scaled');
      return;
    }
    const options = {
      filter: {
        category: 'RX',
      },
      sort: {
        finalRanking: 1,
      }
    }
    filterRequest(options);
    setCategory('RX')
  }

  // HANDLE SORT BY 24.1
  const sortByFirst = async() => {
    if (ascendingWodOne !== true) {
      const options = {
        filter: {
          category: category,
        },
        sort: {
          wodOneRanking: 1,
        }
      }
      filterRequest(options)
      setAscendingWodOne(true);
      return;
    }
    const options = {
      filter: {
        category: category,
      },
      sort: {
        wodOneRanking: -1,
      }
    }
    filterRequest(options)
    setAscendingWodOne(false); 
  }

  // HANDLE SORT BY 24.2
  const sortBySecond = async() => {
    if (ascendingWodTwo !== true) {
      const options = {
        filter: {
          category: category,
        },
        sort: {
          wodTwoRanking: 1,
        }
      }
      filterRequest(options);
      setAscendingWodTwo(true);
      return;
    }
    const options = {
      filter: {
        category: category,
      },
      sort: {
        wodTwoRanking: -1,
      }
    }
    filterRequest(options);
    setAscendingWodTwo(false); 
  };

  // HANDLE SORT BY 24.3
  const sortByThird = async () => {
    if (ascendingWodThree!== true) {
      const options = {
        filter: {
          category: category,
        },
        sort: {
          wodThreeRanking: 1,
        }
      }
      filterRequest(options);
      setAscendingWodThree(true);
      return;
    }
    const options = {
      filter: {
        category: category,
      },
      sort: {
        wodThreeRanking: -1,
      }
    }
    filterRequest(options);
    setAscendingWodThree(false); 
  };

  // HANDLE SORT BY TOTAL
  const sortByTotal = async() => {
    if (ascendingTotal !== true) {
      const options = {
        filter: {
          category: category,
        },
        sort: {
          totalPoints: 1,
        }
      }
      filterRequest(options);
      setAscendingTotal(true)
      return;
    }
    const options = {
      filter: {
        category: category,
      },
      sort: {
        totalPoints: -1,
      }
    }
    filterRequest(options);
    setAscendingTotal(false);
  };

  // HANDLE SORT BY NAME
  const sortByName = async () => {
    if (ascendingNameOrder===false){
      const options = {
        filter: {
          category: category,
        },
        sort: {
          name: 1,
        }
      }
      filterRequest(options);
      setAscendingNameOrder(true)

    } else if (ascendingNameOrder===true) {
      const options = {
        filter: {
          category: category,
        },
        sort: {
          name: -1,
        }
      }
      filterRequest(options);
      setAscendingNameOrder(false)
    }
  }

  // RENDER FIRST LEADERBOARD
  useEffect(()=>{
    sortByTotal()
  },[])

  function timeConverter(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  } 
    return (
      <div className='individualLeaderboard'>
        <div className='leaderboard__line'>
          <p className='leaderboard__index'></p>
          <p className='leaderboard__name'><img className='leaderboard__icon' src={sortIcon} onClick={sortByName}/>Nome</p>
          <p className='leaderboard__text'><img className='leaderboard__icon' src={sortIcon} onClick={changeCategory}/>Categoria</p>
          <p className='leaderboard__text'><img className='leaderboard__icon' src={sortIcon} onClick={sortByFirst}/>24.1</p>
          <p className='leaderboard__text'><img className='leaderboard__icon' src={sortIcon} onClick={sortBySecond}/>24.2</p>
          <p className='leaderboard__text'><img className='leaderboard__icon' src={sortIcon} onClick={sortByThird}/>24.3</p>
          <p className='leaderboard__text'><img className='leaderboard__icon' src={sortIcon} onClick={sortByTotal}/>TOTAL</p>
        </div>
        <ul className='leaderboard__ul'>
          {currentLeaderboard.map((athlete,index) => (
            <li className='leaderboard__line' key={index}>
              <p className='leaderboard__index'>{index+1}</p>
              <p className='leaderboard__name'>{athlete.name}<span className='leaderboard__span'> ({athlete.finalRanking})</span></p>
              <p className='leaderboard__text'>{athlete.category}</p>
              <p className='leaderboard__text'>{athlete.wodOneTime===900 ? athlete.wodOneResult : timeConverter(athlete.wodOneTime)} <span className='leaderboard__span'>({athlete.wodOneRanking})</span></p>
              <p className='leaderboard__text'>{athlete.wodTwoResult} <span className='leaderboard__span'>({athlete.wodTwoRanking})</span></p>
              <p className='leaderboard__text'>{athlete.wodThreeTime===900 ? athlete.wodThreeResult : timeConverter(athlete.wodThreeTime)} <span className='leaderboard__span'>({athlete.wodThreeRanking})</span></p>
              <p className='leaderboard__text'>{athlete.totalPoints}<span> pts</span></p>
            </li>
          ))}
        </ul>
      </div>
    )
  }