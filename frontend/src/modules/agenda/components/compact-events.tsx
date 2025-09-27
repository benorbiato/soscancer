import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';
import { Event } from '../types';
import { EVENT_TYPES } from '../constants';
import { formatBrazilianDate } from '@/lib/date-utils';

interface CompactEventsProps {
  events: Event[];
  title: string;
  emptyMessage?: string;
}

export function CompactEvents({ events, title, emptyMessage = 'Nenhum evento encontrado' }: CompactEventsProps) {
  const formatDate = (dateString: string) => {
    return formatBrazilianDate(dateString);
  };

  const formatTime = (time: string) => {
    return time;
  };

  const getEventTypeInfo = (type: Event['type']) => {
    return EVENT_TYPES[type];
  };

  if (events.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 dark:text-gray-400 text-center py-4 text-sm">
            {emptyMessage}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-brand-500 dark:border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {events.map((event) => {
            const typeInfo = getEventTypeInfo(event.type);
            
            return (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {formatDate(event.date)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>{formatTime(event.time)}</span>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                      {event.title}
                    </h4>
                    {event.location && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {event.location}
                      </p>
                    )}
                  </div>
                </div>
                
                <Badge className={`${typeInfo.color} border-0 text-xs`}>
                  <span className="mr-1">{typeInfo.icon}</span>
                  <span>{typeInfo.label}</span>
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
