import { styled } from "styled-components";
import Arrow_Btn from "../../assets/images/arrow_right.png";
import Badge from "components/group/Badge";
import { Link, useNavigate } from "react-router-dom";

interface GroupListporps {
  name: string;
  role: string;
  date: string;
  memberCount: number;
}

const GroupListItem: React.FC<GroupListporps> = (props: GroupListporps) => {
  return (
    <ItemBox>
      <div id="c1" className="c">
        {props.name}
      </div>
      <div id="c2" className="c">
        <Badge>{props.role}</Badge>
      </div>
      <div id="c3" className="c">
        {props.date}
      </div>
      <div id="c4" className="c">
        {props.memberCount}
      </div>
      <div id="c5" className="c">
        <Link to={"/group/${props.name}"}>
          <img src={Arrow_Btn} />
        </Link>
      </div>
    </ItemBox>
  );
};

export default GroupListItem;

const ItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0px 15px 30px;
  padding-left: 30px;
  font-family: InterMedium, NotoSansMedium;
  font-size: 15px;
  color: #222222;
  border-bottom: 2px solid #cdcdcd;

  .c {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #c1 {
    flex: 3;
    justify-content: flex-start;
  }
`;
