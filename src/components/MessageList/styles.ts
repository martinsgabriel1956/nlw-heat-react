import styled from 'styled-components';

export const MessageListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  > img {
    height: 28px;
    margin: 32px 0;
  }
`;

export const MessageListContent = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  flex: 1;
`;

export const Message = styled.li`
  max-width: 440px;

  &:nth-child(2) {
    margin-left: 80px;
  }
`;

export const MessageContent = styled.p`
  font-size: 20px;
  line-height: 28px;
`;

export const MessageUser = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;

  span {
    font-size: 16px;
    margin-left: 12px;
  }
`;

export const UserImage = styled.div`
  padding: 2px;
  background: linear-gradient(100deg, #FF008e 0%, #FFcd1e 100%);
  border-radius: 50%;
  line-height: 0;

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 4px solid #121214;
  }
`;