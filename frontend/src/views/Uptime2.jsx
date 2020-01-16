import React from "react";
import { Link } from 'react-router-dom'

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

class Uptime2 extends React.Component {
  constructor(){
    super()
    this.state ={
        users:[],
        name: null,
        username: null,
        body: null,
        id: null,
        title: null
    }
}
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Uptime Dashboard per Hari</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Time</th>
                        <th></th>
                        <th>DownTime</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    <td className="text-right">
                    <Link to={'/uptime'}>
                    <button className="btn btn-primary" size="sm">Menu</button>
                    </Link></td>
                    </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            </Row>
        </div>
      </>
    );
  }
}

export default Uptime2;
