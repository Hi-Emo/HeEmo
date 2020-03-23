/*
 * sqlite.ios.promise.js
 *
 * Created by Andrzej Porebski on 10/29/15.
 * Copyright (c) 2015 Andrzej Porebski.
 *
 * Test App using Promise for react-naive-sqlite-storage
 *
 * This library is available under the terms of the MIT License (2008).
 * See http://opensource.org/licenses/alphabetical for full text.
 */
'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';


import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);




const database_name = "Test";

let db;

class SQLiteDemo extends Component {
  constructor() {
    super();
    this.progress = [];
    this.state = {
      progress: [],
    };
    this.ret = [{
      title: '',
      content: '',
    
    },
    ];
    
  }

  updateProgress = (text, resetState) => {
    let progress = [];
    if (!resetState) {
      progress = [...this.progress];
    }
    progress.push(text);
    this.progress = progress;
    this.setState({
      progress
    });
  };

  componentWillUnmount(){
    this.closeDatabase();
  }

  errorCB = (err) => {
    console.log("error: ",err);
    this.updateProgress("Error " + (err.message || err));
  };

  populateDatabase = (db) => {
    this.updateProgress("Database integrity check");
    db.executeSql('SELECT 1 FROM diary LIMIT 1').then(() =>{
      this.updateProgress("Database is ready ... executing query ...");
      
    }).catch((error) =>{
      console.log("Received error: ", error);
      this.updateProgress("Database not yet ready ... populating data");
      db.transaction(this.populateDB).then(() =>{
        this.updateProgress("Database populated ... executing query ...");
        
      });
    });
  };

  populateDB = (tx) => {
    this.updateProgress("Executing DROP stmts");

    tx.executeSql('DROP TABLE IF EXISTS Employees;');
    tx.executeSql('DROP TABLE IF EXISTS Offices;');
    tx.executeSql('DROP TABLE IF EXISTS Departments;');
    tx.executeSql('DROP TABLE IF EXISTS Diary;');


    this.updateProgress("Executing CREATE stmts");


    tx.executeSql('CREATE TABLE IF NOT EXISTS Version( '
      + 'version_id INTEGER PRIMARY KEY NOT NULL); ').catch((error) => {
      this.errorCB(error)
    });

    tx.executeSql('CREATE TABLE IF NOT EXISTS Departments( '
      + 'department_id INTEGER PRIMARY KEY NOT NULL, '
      + 'name VARCHAR(30) ); ').catch((error) => {
      this.errorCB(error)
    });

    tx.executeSql('CREATE TABLE IF NOT EXISTS Offices( '
      + 'office_id INTEGER PRIMARY KEY NOT NULL, '
      + 'name VARCHAR(20), '
      + 'longtitude FLOAT, '
      + 'latitude FLOAT ) ; ').catch((error) => {
      this.errorCB(error)
    });

    tx.executeSql('CREATE TABLE IF NOT EXISTS Employees( '
      + 'employe_id INTEGER PRIMARY KEY NOT NULL, '
      + 'name VARCHAR(55), '
      + 'office INTEGER, '
      + 'department INTEGER, '
      + 'FOREIGN KEY ( office ) REFERENCES Offices ( office_id ) '
      + 'FOREIGN KEY ( department ) REFERENCES Departments ( department_id ));').catch((error) => {
      this.errorCB(error)
    });

    tx.executeSql('CREATE TABLE IF NOT EXISTS Diary( '
      + 'title TEXT PRIMARY KEY NOT NULL, '
      + 'content TEXT);').catch((error) => {
      this.errorCB(error)
    });

    this.updateProgress("Executing INSERT stmts");


    tx.executeSql('INSERT INTO Departments (name) VALUES ("Client Services");');
    tx.executeSql('INSERT INTO Departments (name) VALUES ("Investor Services");');
    tx.executeSql('INSERT INTO Departments (name) VALUES ("Shipping");');
    tx.executeSql('INSERT INTO Departments (name) VALUES ("Direct Sales");');

    tx.executeSql('INSERT INTO Offices (name, longtitude, latitude) VALUES ("Denver", 59.8,  34.1);');
    tx.executeSql('INSERT INTO Offices (name, longtitude, latitude) VALUES ("Warsaw", 15.7, 54.1);');
    tx.executeSql('INSERT INTO Offices (name, longtitude, latitude) VALUES ("Berlin", 35.3, 12.1);');
    tx.executeSql('INSERT INTO Offices (name, longtitude, latitude) VALUES ("Paris", 10.7, 14.1);');

    tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Sylvester Stallone", 2,  4);');
    tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Elvis Presley", 2, 4);');
    tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Leslie Nelson", 3,  4);');
    tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Fidel Castro", 3, 3);');
    tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Bill Clinton", 1, 3);');
    tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Margaret Thatcher", 1, 3);');
    tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Donald Trump", 1, 3);');
    tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Dr DRE", 2, 2);');
    tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Samantha Fox", 2, 1);');
    console.log("all config SQL done");
  };

  saveDiary = (tx, title, text) => {
    console.log('Saving your diary...');
    tx.executeSql('INSERT INTO DIARY (title, content) VALUES (?, ?);', [title, text]).then(([tx, result]) =>{
      console.log('Your diary saved succesfully!!');
      
    }).catch((error) => {
      console.log('FUKING ERROR');
    });
  };

  loadDiary = () => {


    return new Promise((resolve) => {
      const products = [];
      SQLite.openDatabase({name: "Test", location: 'Document'}).then((DB) => {
        db = DB;
        db.transaction((tx) => {
          tx.executeSql('SELECT title, content FROM diary', []).then(([tx,results]) => {
            console.log("Query completed");
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              
              const { title, content } = row;
              products.push({
                title,
                content,
                
              });
            }
            resolve(products);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }


    


  queryEmployees = (tx) => {
    console.log("Executing employee query");
    tx.executeSql('SELECT title, content from Diary').then(([tx,results]) => {
      this.updateProgress("Query completed");
      var len = results.rows.length;
      for (let i = 0; i < len; i++) {
        let row = results.rows.item(i);
        this.updateProgress(`Empl Name: ${row.title}, Dept Name: ${row.content}`)
        console.log(`Empl Name: ${row.title}, Dept Name: ${row.content}`)
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  loadAndQueryDB = () => {
    this.updateProgress("Plugin integrity check ...");
    SQLite.echoTest().then(() => {
      this.updateProgress("Integrity check passed ...");
      this.updateProgress("Opening database ...");
      SQLite.openDatabase({name: "Test", location: 'Document'}).then((DB) => {
        db = DB;
        this.updateProgress("Database OPEN");
        this.populateDatabase(DB);
      }).catch((error) => {
        console.log(error);
      });
    }).catch(error => {
      this.updateProgress("echoTest failed - plugin not functional");
    });
  };

  closeDatabase = () => {
    if (db) {
      console.log("Closing database ...");
      this.updateProgress("Closing DB");
      db.close().then((status) => {
        this.updateProgress("Database CLOSED");
      }).catch((error) => {
        this.errorCB(error);
      });
    } else {
      this.updateProgress("Database was not OPENED")
    }
  };

  deleteDatabase = () => {
    this.updateProgress("Deleting database");
    SQLite.deleteDatabase(database_name).then(() => {
      console.log("Database DELETED");
      this.updateProgress("Database DELETED")
    }).catch((error) => {
      this.errorCB(error);
    });
  };

  getRet = () =>{
    return this.ret;
  }

  

  runDB = (title, text, rw) => {
    let result;

    console.log('running');
    this.updateProgress("Starting SQLite Promise Demo",true);
    this.loadAndQueryDB();

    if(rw === 1){
      SQLite.openDatabase({name: "Test", location: 'Document'}).then((DB) => {
        db = DB;
        db.transaction((tx) => this.saveDiary(tx, title, text))
        
      })
      

    }

    else{
      SQLite.openDatabase({name: "Test", location: 'Document'}).then((DB) => {
        db = DB;
        db.transaction((tx) => this.loadDiary(tx))
      })

      
      
    }

    
    
  }

  
}

var ddb = new SQLiteDemo();
export default ddb;