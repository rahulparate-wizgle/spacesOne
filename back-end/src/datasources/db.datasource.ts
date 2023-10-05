// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-access-control-migration
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';

// TODO: make this configuration .env based
const config = {
  name: 'venuedb',
  connector: 'mongodb',
  url: 'mongodb+srv://demouser01:T9AOmDDJAEcruuYo@cluster0.mkiun.mongodb.net/venuedb',
  host: 'cluster0.mkiun.mongodb.net',
  port: 27017,
  user: 'demouser01',
  password: 'T9AOmDDJAEcruuYo',
  database: 'venuedb',
  useNewUrlParser: true
};

export class DbDataSource extends juggler.DataSource {
  static dataSourceName = 'db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

// host: "krcrm.ccccu5t6vmzn.ap-south-1.rds.amazonaws.com",
// port: 1433,
// username: "admin",
// password: "eRpgNc647sfDi7b",
// database: "krsherpa",
// url: 'mssql://admin:eRpgNc647sfDi7b@krcrm.ccccu5t6vmzn.ap-south-1.rds.amazonaws.com,1433/krsherpa',
