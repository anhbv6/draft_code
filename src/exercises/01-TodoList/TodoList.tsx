import './TodoList.css';
import { useEffect, useRef, useState } from 'react'
import { listFilter, type Item } from './typeTodo';
import Icon from '../../components/Icon';


const TodoList = () => {
  const [valueInput, setValueInput] = useState<string>('');
  const [valueInputSearch, setValueInputSearch] = useState<string>('');
  const [sortDone, setSortDone] = useState("doneFirst");
  const [listTodo, setListTodo] = useState<Item[]>(() => {
    const data = sessionStorage.getItem('todoListData')
    return data ? JSON.parse(data) : []
  });
  const [editInput, setEditInput] = useState<string>('');
  const [filter, setFilter] = useState('all');
  const [toggle, setToggle] = useState(false);
  const focusInput = useRef<HTMLInputElement>(null);
  const checkMiniToggle = useRef<HTMLDivElement>(null);
  
  const handleSubmitAdd = () => {
    if (valueInput === '') return;
    const value = {
      id: crypto.randomUUID(), 
      name: valueInput,
      checked: false,
      edit: false,
    }
    setListTodo(prev => [...prev, value]);
    setValueInput('');
    focusInput.current?.focus();
  }

  const handleEnterAdd = (e: any) => {
    if (e.key === "Enter") {
      handleSubmitAdd();
    }
  }

  const handleDeleteTodo = (value: Item) => {
    const data = listTodo.filter(item => item.id !== value.id);
    setListTodo(data)
  }

  const handleCheckTodo = (check: boolean, value: any) => {
    setListTodo(prev => prev.map(item => 
      item.id === value.id ? {...item, checked: check} : item
    ))
  }

  const handleEditTodo = (value: Item, cancel?: boolean, changeName?: string) => {
    if (cancel) {
      setEditInput('');
      setListTodo(prev => prev.map(item => 
        item.id === value.id ? {...item, edit: false} : item
      ))
      return
    }

    if (changeName) {
      setListTodo(prev => prev.map(item => 
        item.id === value.id ? {...item, name: changeName, edit: false} : item
      ))
      setEditInput('');
      return;
    }

    setListTodo(prev => prev.map(item => 
      item.id === value.id ? {...item, edit: true} : item
    ))
  }

  const filterData = listTodo.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'do') return item.checked === false;
    if (filter === 'completed') return item.checked === true;
    return true;
  })

  const searchData = filterData.filter(item => 
    item.name.toLowerCase().includes(valueInputSearch.toLowerCase())
  )

  const finalData = [...searchData].sort((a, b) =>
    sortDone === "doneFirst"
      ? Number(a.checked) - Number(b.checked)
      : Number(b.checked) - Number(a.checked)
  );

  useEffect(() => {
    if (focusInput.current) {
      focusInput.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleClickOutSide = (e: any) => {
      if (checkMiniToggle.current && !checkMiniToggle.current.contains(e.target)) {
        setToggle(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutSide);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  useEffect(() => {
    sessionStorage.setItem('todoListData', JSON.stringify(listTodo))
  }, [listTodo]);

  return (
    <div className='containerTodoList'>
      <div className='content'>
        <h1 className='title'>TO DO LIST</h1>
        <div style={{
          display: 'flex',
          gap: '4px',
        }}>
          <input
            ref={focusInput}
            name='todoinput' 
            type='text' 
            onChange={(e) => setValueInput(e.target.value)} 
            value={valueInput} 
            className='inputCustom' 
            placeholder='Add something :D'
            onKeyDown={handleEnterAdd}
          />
          <span onClick={handleSubmitAdd} className='btn'>Add</span>
          {listTodo.length > 0 && <span onClick={() => setListTodo([])} className='btn'>Clear</span>}
        </div>

        

        {listTodo.length > 0 && <div style={{
          marginTop: '30px',
          position: 'relative',
          display: 'flex',
          gap: '8px',
        }}>
          <span className='btn' style={{}} onClick={() => setToggle(prev => !prev)}>Filter</span>
          <div className='tableMiniCustom' 
            ref={checkMiniToggle}
            style={{
              display: toggle ? 'grid' : 'none'
            }}
          >
            {listFilter.map(item => (
              <label style={{display: 'flex', flexDirection: 'row', gap: '8px', cursor: 'pointer'}} onClick={() => setFilter(item.name)}>
                <input type='checkbox' checked={filter === item.name}/>
                <span>{item.name}</span>
              </label>
            ))}
          </div>
          <div className='inputSearch' style={{display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center'}}>
            <input 
              name='searchInput'
              style={{width: '100%'}} 
              required 
              onChange={(e) => setValueInputSearch(e.target.value)}
              value={valueInputSearch}
            />
            <p>Search</p>
            <span>
              <i />
            </span>
            <div style={{
              padding: '12px',
            }}>
              <Icon name='search' color='#1e1e1e' size={15}/>
            </div>
          </div>
          <div 
            style={{
              padding: '12px',
              cursor: 'pointer',
            }}
            onClick={() => setSortDone(prev => prev === "doneFirst" ? "doneLast" : "doneFirst")}
          >
            <Icon name='sort' style={{
              color: sortDone === "doneFirst" ? '#aaa' : "#2196F3"
            }} size={15}/>
          </div>
        </div>}

        {finalData.length > 0 ? <div style={{
          marginTop: '20px',
        }}>
          <ul style={{
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            overflow: 'auto',
            height: '510px',
            scrollbarWidth: 'none',
          }}>
            {finalData.map(item => (
              <div style={{
                border: '1px solid #aaa',
                padding: '10px',
                borderRadius: '3px',
              }}>
                {item.edit ? <div className='containerItem' style={{padding: 0}}>
                  <input 
                    name='todoinputedit' 
                    type='text'
                    value={editInput} 
                    onChange={(e) => {
                      setEditInput(e.target.value);
                    }}
                    className='inputCustom'
                  />
                  <div className='customInputAction'>
                    <Icon name='close' color='#1e1e1e' size={13} onClick={() => handleEditTodo(item, true)} className='iconCustom'/>
                  </div>
                  <div className='customInputAction'>
                    <Icon name='check' color='#1e1e1e' size={15} onClick={() => handleEditTodo(item, false, editInput)} className='iconCustom'/>
                  </div>
                </div> :
                <label className='containerItem' style={{cursor: 'pointer'}}>
                  <input name='editInput' className='inputView' checked={item.checked} type='checkbox' 
                    onChange={(e) => {
                      handleCheckTodo(e.target.checked, item)
                    }}
                  />
                  <span className="checkmark"></span>
                  <li style={{
                    textDecoration: item.checked === true ? 'line-through' : '',
                    color: item.checked === true ? '#aaa' : '#000000',
                    width: '100%',
                    height: '100%',
                    maxWidth: 'calc(100% - 50px)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'block',
                    alignContent: 'center',
                  }}>
                    {item.name}
                  </li>
                  {!editInput && <>
                    <div style={{padding: '10px'}}>
                      <Icon name='bin' color='#1e1e1e' size={15} onClick={() => handleDeleteTodo(item)} className='iconCustom'/>
                    </div>
                    <div style={{padding: '10px'}}>
                      <Icon name='pen' color='#1e1e1e' size={15} onClick={() => {
                          setEditInput(item.name);
                          handleEditTodo(item); 
                        }}
                        className='iconCustom'
                      />
                    </div>
                  </>}
                </label>}
              </div>
            ))}
          </ul>
        </div> : <div style={{marginTop: '20px', textAlign: 'center'}}>You have nothing to do! Add more do more :))</div>}
      </div>
    </div>
  )
}

export default TodoList