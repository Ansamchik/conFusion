import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable()
export class LeadersService {

  constructor() { }

  getLeaders(): Promise<Leader[]> {
      return new Promise(resolve => {
          // Simulate server latency with 2 second delay
          setTimeout(() => resolve(LEADERS), Math.random() * 2000);
      });
  }

  getLeaderById(id: number): Promise<Leader> {
      return new Promise(resolve => {
          // Simulate server latency with 2 second delay
          setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]), Math.random() * 2000);
      });
  }

  getFeaturedLeader(): Promise<Leader> {
      return new Promise(resolve => {
          // Simulate server latency with 2 second delay
          setTimeout(() => resolve(LEADERS.filter((leader) => (leader.featured))[0]), Math.random() * 2000);
      });
  }

}
