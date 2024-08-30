import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated, useTrail } from 'react-spring';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  background: #f0f4f8;
`;

const ConfirmationCard = styled(animated.div)`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #4caf50;
  margin: 0 0 10px;
`;

const Message = styled.p`
  font-size: 16px;
  color: #333;
  margin: 0 0 20px;
`;

const Button = styled(animated.button)`
  background: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
`;

const TicketConfirmation = () => {
  const cardProps = useSpring({
    opacity: 1,
    transform: 'scale(1) rotate(0deg)',
    from: { opacity: 0, transform: 'scale(0.8) rotate(-15deg)' },
    config: { tension: 200, friction: 20 },
  });

  const buttonTrail = useTrail(1, {
    opacity: 1,
    transform: 'scale(1)',
    from: { opacity: 0, transform: 'scale(0.5)' },
    delay: 700,
  });

  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      navigate("/")
    }, 3000);
  }, [])
  return (
    <Container>
      <ConfirmationCard style={cardProps}>
        <Title>Ticket Confirmed!</Title>
        <Message>Your ticket has been successfully confirmed.</Message>
        {buttonTrail.map((style, index) => (
          <Button key={index} style={style}>
            Thanks for trusting US! 🙏😊
          </Button>
        ))}
      </ConfirmationCard>
    </Container>
  );
};

export default TicketConfirmation;
