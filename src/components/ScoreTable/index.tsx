import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../enums';
import { User } from '../../interface';
import { useStore } from '../../state';
import BaseButton from '../BaseButton';
import './style.css';

const ScoreTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const getUsers = useStore((state) => state.getUsers);
  const [orderSort, setOrderSort] = useState('ASC');
  const navigate = useNavigate();

  useEffect(() => {
    getUsers().then((res) =>
      setUsers(
        res.filter((i) => i.score !== null).sort((a, b) => b.score - a.score),
      ),
    );
  }, []);

  const sortHandler = () => {
    if (orderSort === 'ASC') {
      setUsers((prev) => prev.sort((a, b) => a.score - b.score));
      setOrderSort('DESC');
    } else {
      setUsers((prev) => prev.sort((a, b) => b.score - a.score));
      setOrderSort('ASC');
    }
  };

  const prevPageHandler = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const nextPageHandler = () => {
    if (page < users.length / 5) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className='score'>
      <h1 className='score__header'>Score</h1>
      <div className='wrapper-btn'>
        <BaseButton
          btnText='⇐ Menu'
          onClickCallback={() => navigate(`${RoutesEnum.Home}`)}
        />
      </div>
      <div className='table-wrapper'>
        <table className='score__table'>
          <thead className='score__thead'>
            <tr>
              <th>Name</th>
              <th
                className={`table-header__score table-header__score-${orderSort}`}
                onClick={sortHandler}
              >
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {users.slice((page - 1) * 5, page * 5).map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {users.length > 5 && (
        <div className='pagination'>
          <BaseButton btnText={'<'} onClickCallback={prevPageHandler} />
          <span className='pagination__page'>{page}</span>
          <BaseButton btnText={'>'} onClickCallback={nextPageHandler} />
        </div>
      )}
    </div>
  );
};

export default ScoreTable;
