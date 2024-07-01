import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';



const HoverListItem = styled(ListItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));



const Home = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const items = ['Match Card', 'Solving Sudoku', 'Find Hat',];
  
  const handleKeyDown = ({ key } : { key: string}) => {
    if (key === 'ArrowDown') {
      setSelectedIndex((prevIndex) => (prevIndex < items.length - 1 ? prevIndex + 1 : prevIndex));
    } else if (key === 'ArrowUp') {
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Container maxWidth="md">
      <Typography  variant="body1" 
        sx={{
          textAlign: 'center',
          marginTop: 2.5
      }}>
        What game do you to Play ? Select it.
      </Typography>
      <List>
        {items.map((item, index) => (
          <HoverListItem
            key={item}
            selected={selectedIndex === index}
            onMouseEnter={() => setSelectedIndex(index)}
          >
            <ListItemText primary={item} />
          </HoverListItem>
        ))}
      </List>
    </Container>
    
  );
};

export default Home;
