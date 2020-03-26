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




const database_name = "TestDB";

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
    db.executeSql('SELECT 1 FROM accounts LIMIT 1').then(() =>{
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
    tx.executeSql('DROP TABLE IF EXISTS accounts;');


    this.updateProgress("Executing CREATE stmts");


    tx.executeSql('CREATE TABLE IF NOT EXISTS accounts( '
      + 'ID TEXT PRIMARY KEY NOT NULL, '
      + 'PW TEXT);').catch((error) => {
      this.errorCB(error)
    });

    tx.executeSql('CREATE TABLE IF NOT EXISTS Diary( '
      + 'title TEXT PRIMARY KEY NOT NULL, '
      + 'content TEXT);').catch((error) => {
      this.errorCB(error)
    });

    this.updateProgress("Executing INSERT stmts");

    console.log("all config SQL done");
  };

  
  saveAccount = (tx, id, pw) => {
    console.log('Saving your account');
    tx.executeSql('INSERT INTO accounts (ID, PW) VALUES (?, ?);', [id, pw]).then(([tx, result]) =>{
      console.log('Your account saved succesfully!!');
      
    }).catch((error) => {
      console.log('FUKING ERROR');
    });
  };


  loadAccount = () => {


    return new Promise((resolve) => {
      const acc = [];
      SQLite.openDatabase({name: "TestDB", location: 'Document'}).then((DB) => {
        db = DB;
        db.transaction((tx) => {
            console.log("asd")
          tx.executeSql('SELECT ID, PW FROM accounts', []).then(([tx,results]) => {
            console.log(results);
            console.log("Query completed");
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              
              const { ID, PW } = row;
              acc.push({
                ID,
                PW,
                
              });
            }
            
            resolve(acc);
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


    

  loadAndQueryDB = () => {
    this.updateProgress("Plugin integrity check ...");
    SQLite.echoTest().then(() => {
      this.updateProgress("Integrity check passed ...");
      this.updateProgress("Opening database ...");
      SQLite.openDatabase({name: "TestDB", location: 'Document'}).then((DB) => {
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



  runDB = (id, pw, rw) => {
    let result;

    console.log('running');
    this.updateProgress("Starting SQLite Promise Demo",true);
    this.loadAndQueryDB();

    if(rw === 1){
      SQLite.openDatabase({name: "TestDB", location: 'Document'}).then((DB) => {
        db = DB;
        db.transaction((tx) => this.saveAccount(tx, id, pw))
        
      })
      

    }

    else{
      SQLite.openDatabase({name: "TestDB", location: 'Document'}).then((DB) => {
        db = DB;
        db.transaction((tx) => this.loadDiary(tx))
      })

      
      
    }

    
    
  }

  
}

var ddb = new SQLiteDemo();
export default ddb;